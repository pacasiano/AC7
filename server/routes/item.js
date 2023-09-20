const express = require('express');
const app = express();
const mysql = require('mysql2');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

//parse/extract data from a <form>
app.use(express.urlencoded( { extended: true } ));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatamIdoing332', //enter your own password
    database: 'ac7_database'
});

// async function getProductID(product_name) {
//     const connection = await mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'whatamIdoing332', //enter your own password
//         database: 'ac7_database'
//     });

//     try {
//         const q = `SELECT product_id FROM product WHERE product.name = '${product_name}'`;
//         const [results, fields] = await connection.query(q);
//         console.log("Results: " + results);

//         if (results.length > 0) {
//             //results is an array of objects, results[0] assumes that we want the first row
//             //at least 1 row is returned from the query (product exists)
//              return results[0].product_id; 
//         } 
//         else {
//             throw new Error("Product doesn't exist!");
//         }
//       } 
//       catch (error) {
//           console.error('Error:', error);
//           throw error;
//       } 
//       finally {
//           await connection.end();
//       }
// }

app.post('/api/item', (req, res) => {
    const {username, password} = req.body;
    //instead of req.headers.cookie which returns a string, we can use the cookie parser 'req.cookies' to return an object
    const {account_id} = req.cookies;
    const {product_id, product_name, product_price} = req.body;
    // console.log(req.cookies);
    // console.log(req.body);

    let q = ""
    connection.query(q, function(err, results) {

    })
    
    // res.json(results); //returns an array of obj literals in JSON format, each obj literal is a row from users table
    // connection.end()
    // res.redirect('http://localhost:3000/AC7/cart');
    // console.log("Product ID: " + product_id);
    // const q2 = ``;
    // connection.query(q2, function(err, results) {

    // })

    //need to query the sale_id of this user (use their account_id)
    //once you have the sale_id, create a sale_item entry 
    //sale_item(sale_id, account_id, product_id, price)
});

module.exports = app;