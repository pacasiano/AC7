const express = require('express');
const app = express();
const mysql = require('mysql2');
const cookieParser = require('cookie-parser');
const router = express.Router();

router.use(cookieParser());
router.use(express.json())

//parse/extract data from a <form>
// app.use(express.urlencoded( { extended: true } ));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatamIdoing332', //enter your own password
    database: 'ac7_database'
});

router.post('/', (req, res) => {
    //instead of req.headers.cookie which returns a string, we can use the cookie parser 'req.cookies' to return an object
    const {account_id} = req.cookies;
    let {product_id, product_price, quantity: addedQuantity = 1} = req.body;
    product_price = product_price.replace('₱', ''); //the value returned from client-side has a dollar sign, so we remove it

    //Query 1: Get the sale_id with the sale_status of 'cart'
    let q = `SELECT sale_id FROM sale WHERE account_id = '${account_id}' AND sale_status = 'cart'`;
    connection.query(q, function(err, results) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: "Database query error" });
            return; // Exit the function early to prevent further execution
        }
    
        if (results.length === 0) {
            console.error("No results found for the query.");
            res.status(404).json({ error: "No results found" });
            return; // Exit the function early to prevent further execution
        }
    
        const { sale_id } = results[0];

        //Query 2: Checks if the product that was added to cart already has a sale_item entry that's connected to an 'cart' sale (current sale)
        //Basically, this query checks if the product is already in the cart or not. If it is, Query 3 runs, if not, Query 4 runs
        let q2 = 'SELECT sale_item_id, product_id FROM sale INNER JOIN sale_item USING (sale_id) ' + 
                `WHERE account_id = ${account_id} AND product_id = ${product_id} AND sale_status = 'cart'`;
        connection.query(q2, function(err, results) {
            console.log("Add to cart: Query 2 ");
            console.log(results) 
            if (results[0]) {
                //Query 3: If this product exists in the cart already, we want to (1) take its quantity then (2) add the quantity that the user inputted
                let q3 =  'SELECT quantity FROM sale INNER JOIN sale_item USING (sale_id) ' + 
                            `WHERE account_id = ${account_id} AND product_id = ${product_id} AND sale_status = 'cart'`;
                connection.query(q3, function(err, results) {
                    let {quantity} = results[0];
                    quantity = parseInt(quantity) + addedQuantity;
                    console.log('Add to cart: Query 3 Updated quantity: ' + quantity)
                    let updateQtyQuery = `UPDATE sale_item INNER JOIN sale USING (sale_id) SET quantity = ${quantity} ` + 
                                        `WHERE sale.account_id = ${account_id} AND product_id = ${product_id}`;
                    connection.query(updateQtyQuery, function(err, results) {
                        console.log("Add to cart: Sale_item quantity successfully updated!")
                        res.json({message: "Goods 👍"})
                    })
                })
            }
            else {
                //Query 4: (Product doesn't exist in cart yet) Create sale_items with the sale_id we got from 1st Query
                console.log('INSIDE 4th QUERY')
                let q4 = `INSERT INTO sale_item(sale_id, product_id, price, quantity) VALUES (${sale_id}, ${product_id}, '${product_price}', ${addedQuantity})`;
                connection.query(q4, function(err, results) {
                    if (err) {
                        console.error("Error inserting into the database:", err);
                        // Handle the error as needed, e.g., return an error response or throw an exception.
                        // You may want to end the request or provide a meaningful response to the client.
                        res.status(500).json({ error: "Database insert error" });
                        return; // Exit the function early to prevent further execution
                    }
            
                    console.log("Add to cart: Query 4 successful", results);
                    res.redirect('/AC7/cart')

                });
            }
        }) 
    });
});

//this is for DELETE http request. We use POST since <form> doesnt have a method for delete
router.post('/:id', (req, res) => {
    console.log('DELETE item works!')
    const {id: product_id} = req.params;
    const {account_id} = req.cookies;
    // console.log(req.params);
    const q = 'DELETE sale_item FROM sale_item INNER JOIN sale USING (sale_id)' +
            ` WHERE account_id = ${account_id} AND product_id = ${product_id}`;
    connection.query(q, (err, results) => {
        console.log(`Successfully deleted item with id ${product_id} from account with id ${account_id}`)
        res.redirect('/AC7/cart');
    });
})

module.exports = router;