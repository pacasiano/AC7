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
    
        let q2 = `INSERT INTO sale_item(sale_id, account_id, product_id, price) VALUES (${sale_id}, ${account_id}, ${product_id}, '${product_price}')`;
        connection.query(q2, function(err, results) {
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
    });
    
    
    // connection.end()

    //need to query the sale_id of this user (use their account_id)
    //once you have the sale_id, create a sale_item entry 
    //sale_item(sale_id, account_id, product_id, price)
});

module.exports = router;