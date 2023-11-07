const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql2');

//app.use baited me so hard causing req.body to be empty. It took 6 fucking hrs to debug. All it took was to change app.use to router.use 🤦‍♂️
router.use(express.json())

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatamIdoing332', //enter your own password
    database: 'ac7_database'
});

router.post('/', (req, res) => {
    //when a checkout POST request is sent, the data that i want are: 
    //1. gcash_payment (if gcash)
    //4. Address_id for shipment entry
    console.log('CHECK ME TF OUT')
    console.log(req.body)
    const {account_id, items_purchased, payment_method, address_name} = req.body;

    //Query 1: Update the product table - stock out the products that were bought in the checkout
    items_purchased.forEach((item) => {
        let q1 = `UPDATE product SET quantity = quantity - ${item.quantity} WHERE product_id = ${item.product_id};`
        connection.query(q1, (err, results) => {
            if (err) {
                console.error(err)
            }
            else {
                console.log('Checkout: Query 1 successful')
            }
        })
    })

    //Query 2: Update the sale_status of the current sale from 'in progress' to 'complete'
    const q2 = `UPDATE sale SET sale_status = 'complete' WHERE account_id = ${account_id} AND sale_status = 'in progress'`;
    connection.query(q2, (err, results) => {
        if (err) { 
            console.error(err) 
        } 
        else {
            console.log('Checkout: Query 2 successful')
        }
    })

    //Query 3: Create a new sale entry for the account
    const q3 = `INSERT INTO sale(account_id) VALUES(${account_id})`;
    connection.query(q3, (err, results) => {
        if (err) { 
            console.error(err) 
        }
        else {
            console.log('Checkout: Query 3 successful')
        }
    })
    
    res.json({
        message: 'Success'
    })
})


module.exports = router;
