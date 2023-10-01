const express = require('express');
const app = express();
const mysql = require('mysql2');
const cookieParser = require('cookie-parser');
const router = express.Router();

app.use(cookieParser());

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatamIdoing332', //enter your own password
    database: 'ac7_database'
});

// router.post('/', (req, res) => {

//     // need the account_id from cookies to know which account's shopping cart to query
//     // shopping cart display-data needed: product.name, product.price,  
//     const {account_id} = req.cookies;
//     console.log("Account ID (cookies): " + account_id);
//     res.redirect('http://localhost:3000/AC7/cart');
// });


router.get('/:id', (req, res) => {

    console.log('RUNNING .get("/cart/:id")')
    const {id: account_id} = req.params;
    let q = 'SELECT product.name, product.price, sale.account_id FROM sale ' + 
            'INNER JOIN sale_item USING (sale_id) ' +
            'INNER JOIN product USING (product_id) ' +
            `WHERE sale.account_id = ${account_id};`;

    connection.query(q, function(err, results) {
        if (err) {
            console.log(err.message);
        }
        console.log(results);

        res.json(results);
    });
});

module.exports = router;