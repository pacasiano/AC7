const express = require('express');
const app = express();
const mysql = require('mysql2');
const cookieParser = require('cookie-parser');
const router = express.Router();

router.use(cookieParser());

//parse/extract data from a <form>
// app.use(express.urlencoded( { extended: true } ));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatamIdoing332', //enter your own password
    database: 'ac7_database'
});

router.post('/', (req, res) => {
    const {username, password} = req.body;
    //instead of req.headers.cookie which returns a string, we can use the cookie parser 'req.cookies' to return an object
    const {account_id} = req.cookies;
    let {product_id, product_name, product_price} = req.body;
    product_price = product_price.replace('$', ''); //the value returned from client-side has a dollar sign, so we remove it

    //1st Query: We want the sale_id with the sale_status of 'in progress'
    let q = `SELECT sale_id FROM sale WHERE account_id = '${account_id}' AND sale_status = 'in progress'`;
    connection.query(q, function(err, results) {
        if (err) {
            console.error("Error querying the database:", err);
            // Handle the error as needed, e.g., return an error response or throw an exception.
            // You may want to end the request or provide a meaningful response to the client.
            res.status(500).json({ error: "Database query error" });
            return; // Exit the function early to prevent further execution
        }
    
        if (results.length === 0) {
            console.error("No results found for the query.");
            // Handle the case where no results were found.
            // You may want to return an appropriate response to the client.
            res.status(404).json({ error: "No results found" });
            return; // Exit the function early to prevent further execution
        }
    
        const { sale_id } = results[0];

        //✅get the product_id of the product that was added to cart
        //check if the current sale has a sale_item with this product_id
        //if there is, increment the qty of that product in that sale_item
        //if not, add a sale_item with that product_id

        let q2 = `SELECT sale_item_id, product_id FROM sale INNER JOIN sale_item WHERE sale.account_id = ${account_id} AND product_id = ${product_id}`
        connection.query(q2, function(err, results) {
            // console.log("INSIDE 2nd QUERY: ");
            // console.log(results) 
            if (results[0]) {
                //If this product exists in the cart already, we want to (1) take its quantity then (2) increment it
                // console.log("INSIDE 3RD QUERY")
                let q3 =  'SELECT sale_item.quantity FROM sale INNER JOIN sale_item USING (sale_id) ' + 
                            `WHERE sale.account_id = ${account_id} AND product_id = ${product_id}`;
                connection.query(q3, function(err, results) {
                    // console.log(results[0])
                    let {quantity} = results[0]; 
                    quantity = parseInt(quantity)+1;
                    console.log('Updated quantity: ' + quantity)
                    let updateQtyQuery = `UPDATE sale_item INNER JOIN sale USING (sale_id) SET quantity = ${quantity} ` + 
                                        `WHERE sale.account_id = ${account_id} AND product_id = ${product_id}`;
                    connection.query(updateQtyQuery, function(err, results) {
                        console.log("Sale_item quantity successfully updated!")
                        res.redirect('http://localhost:3000/AC7/cart');
                    })
                })
            }
            else {
                //4th Query: Create sale_items with the sale_id we got from 1st Query
                console.log('INSIDE 4th QUERY')
                let q4 = `INSERT INTO sale_item(sale_id, account_id, product_id, price) VALUES (${sale_id}, ${account_id}, ${product_id}, '${product_price}')`;
                connection.query(q4, function(err, results) {
                    if (err) {
                        console.error("Error inserting into the database:", err);
                        // Handle the error as needed, e.g., return an error response or throw an exception.
                        // You may want to end the request or provide a meaningful response to the client.
                        res.status(500).json({ error: "Database insert error" });
                        return; // Exit the function early to prevent further execution
                    }
            
                    console.log("Insert successful:", results);
                    res.redirect('http://localhost:3000/AC7/cart');
                });
            }
        }) 

    
    });
    
    
    // connection.end()

    //need to query the sale_id of this user (use their account_id)
    //once you have the sale_id, create a sale_item entry 
    //sale_item(sale_id, account_id, product_id, price)
});

//this is for DELETE http request. We use POST since <form> doesnt have a method for delete
router.post('/:id', (req, res) => {
    console.log('DELETE item works!')
    const {id: product_id} = req.params;
    const {account_id} = req.cookies;
    // console.log(req.params);
    const q = `DELETE FROM sale_item WHERE account_id = ${account_id} AND product_id = ${product_id}`;
    connection.query(q, (err, results) => {
        console.log(`Successfully deleted item with id ${product_id} from account with id ${account_id}`)
        res.redirect('http://localhost:3000/AC7/cart');
    });
})

module.exports = router;