const express = require('express');
const mysql = require('mysql2');
const app = express();
const router = express.Router();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatamIdoing332',
    database: 'ac7_database'
});

router.post('/', (req, res) => {
    //need to insert into 2 tables: inventory_in && inventory_in_item
    //inventory_in_item needs inventory_in_id, product_id, and quantity
    //need to create a row in inventory_in_item for each product_id
    console.log('STOCK IN')
    console.log(req.body)
    const {supplierName, payment_amount, product_name, price, quantity} = req.body; //all of these values must be required

    //Query 1: Insert a new row into inventory_in (hopefully all supplier names are unique, else we're fcked)
    const q1 = `INSERT INTO inventory_in SET supplier_id = (SELECT supplier_id FROM supplier WHERE name = '${supplierName}'), ` + 
                `payment_amount = ${payment_amount}`;
    connection.query(q1, (err, results) => {
        if (err) {
            console.error(err)
        }
        else {
            console.log('Successfully inserted to inventory_in table')
        }

        // Query 2: Insert a row into inventory_in_item for each product id
        let q2 = 'INSERT INTO inventory_in_item SET inventory_in_id = (SELECT MAX(inventory_in_id) FROM inventory_in), ' +
                `product_id = (SELECT product_id FROM product WHERE name = '${product_name}'), ` +
                `price = ${price}, quantity = ${quantity}`;

        //If the inventory in includes multiple products, the product_name, price, and quantity becomes an array 
        if(Array.isArray(product_name)) {
            for(let i = 0; i < product_name.length; i++) {
                q2 = 'INSERT INTO inventory_in_item SET inventory_in_id = (SELECT MAX(inventory_in_id) FROM inventory_in), ' +
                    `product_id = (SELECT product_id FROM product WHERE name = '${product_name[i]}'), ` +
                    `price = ${price[i]}, quantity = ${quantity[i]}`;
                connection.query(q2, (err, results) => {
                    if (err) {
                        console.error(err)
                    }
                    else {
                        console.log('Successfully inserted into inventory_in_item table')
                    }
                })
            }
            res.send('Inventory in successful! Good job worker :)');
        }
        else {
            connection.query(q2, (err, results) => {
                if (err) {
                    console.error(err)
                }
                else {
                    console.log('Successfully inserted into inventory_in_item table')
                    res.send('Inventory in successful! Good job worker :)');
                }
            })
        }

        

    })
})

module.exports = router;