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
    console.log('CHECK ME TF OUT')
    console.log(req.body)
    const {account_id, items_purchased, payment_method, address_name, gcash_ref_num} = req.body;
    //need to validate gcash_ref_num length doesn't exceed 13 and only contains numbers

    //Query 1: Create a sale_payment entry
    const q1 = `INSERT INTO sale_payment SET sale_id = (SELECT sale_id FROM sale WHERE account_id = ${account_id} AND sale_status = 'cart'), ` +
                `mode_of_payment = '${payment_method}'`;
    connection.query(q1, (err, results) => {
        if (err) {
            console.error(err)
        }
        else {
            console.log("Checkout: Query 1 successful")
        }
    })

    //Query 2: Store Gcash reference number
    if (payment_method === 'gcash') {
        const q2 = `INSERT INTO gcash_payment SET ` +
                    `reference_num = ${gcash_ref_num}, ` +
                    `sale_payment_id = (SELECT sale_payment_id FROM sale_payment INNER JOIN sale USING (sale_id) ` +
                                        `WHERE account_id = ${account_id} AND sale_status = 'cart')`; 
        connection.query(q2, (err, results) => {
            if (err) {
                console.error(err)
            }
            else {
                console.log("Checkout: Query 2 successful")
            }
        })
    }

    //Query #? : Create shipment entry (temporary implementation)
    const createShipmentQuery = `INSERT INTO shipment SET ` +
                            `sale_id = (SELECT sale_id FROM sale WHERE account_id = ${account_id} AND sale_status = 'cart'), ` +
                            `address_id = (SELECT address_id FROM address WHERE name = '${address_name}' AND ` +
                                            `customer_id = (SELECT customer_id FROM customer WHERE account_id = ${account_id})), ` +
                            `tracking_number = '123', courier = 'JNT', shipment_status = 'in progress'`;
    connection.query(createShipmentQuery, (err, results) => {
        if (err) {
            console.error(err)
        }
        else {
            console.log('Checkout: createShipmentQuery successful')
        }
    })

    //Query 3: Update the product table - stock out the products that were bought in the checkout
    items_purchased.forEach((item) => {
        const q3 = `UPDATE stock SET quantity = quantity - ${item.quantity} ` +
                    `WHERE product_id = ${item.product_id} ` +
                    `AND batch_no = (SELECT batch_no FROM (SELECT MIN(batch_no) AS batch_no FROM stock WHERE product_id = ${item.product_id} AND quantity > 0) as x)`;
        connection.query(q3, (err, results) => {
            if (err) {
                console.error(err)
            }
            else {
                console.log('Checkout: Query 3 successful')
            }
        })
    })

    //Query 4: Update the sale_status of the current sale from 'cart' to 'packaging'
    const q4 = `UPDATE sale SET sale_status = 'packaging' WHERE account_id = ${account_id} AND sale_status = 'cart'`;
    connection.query(q4, (err, results) => {
        if (err) { 
            console.error(err) 
        } 
        else {
            console.log('Checkout: Query 4 successful')
        }
    })

    //Query 5: Create a new sale entry for the account
    const q5 = `INSERT INTO sale(account_id) VALUES(${account_id})`;
    connection.query(q5, (err, results) => {
        if (err) {
            console.error(err)
        }
        else {
            console.log('Checkout: Query 5 successful')
        }
    })
    
    res.json({
        message: 'Success'
    })
})


module.exports = router;
