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
    //need to create a row in inventory_in_item for each product_id
    //whatever you insert into inventory_in_item, also insert that into stock table
    console.log('STOCK IN')
    console.log(req.body)
    const {supplier_name, payment_amount, product_name, price, quantity: stock_in_qty} = req.body; //all of these values must be required

    //Query 1: Insert a new row into inventory_in (hopefully all supplier names are unique, else we're fcked)
    const q1 = `INSERT INTO inventory_in SET supplier_id = (SELECT supplier_id FROM supplier WHERE name = '${supplier_name}'), ` + 
                `payment_amount = ${payment_amount}`;
    connection.query(q1, (err, results) => {
        if (err) {
            console.error(err)
        }
        else {
            console.log('Successfully inserted to inventory_in table')
        }
    })

    // Query 2: Insert a row into inventory_in_item for each product id
    let q2 = 'INSERT INTO inventory_in_item SET inventory_in_id = (SELECT MAX(inventory_in_id) FROM inventory_in), ' +
            `product_id = (SELECT product_id FROM product WHERE name = '${product_name}'), ` +
            `price = ${price}, quantity = ${stock_in_qty}`;

    //If the inventory-in includes multiple products, the product_name, price, and quantity becomes an array 
    if(Array.isArray(product_name)) {
        for(let i = 0; i < product_name.length; i++) {
            q2 = 'INSERT INTO inventory_in_item SET inventory_in_id = (SELECT MAX(inventory_in_id) FROM inventory_in), ' +
                `product_id = (SELECT product_id FROM product WHERE name = '${product_name[i]}'), ` +
                `price = ${price[i]}, quantity = ${stock_in_qty[i]}`;
            connection.query(q2, (err, results) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    }
    else {
        connection.query(q2, (err, results) => {
            if (err) {
                console.error(err)
            }
        })
    }

    //Query 3: Get the latest batch_no of a product
    const q3 = `SELECT MAX(batch_no) AS max_batch_no FROM stock WHERE product_id = (SELECT product_id FROM product WHERE name = '${product_name}')`;
    connection.query(q3, (err, results) => {
        if (err) {
            console.error(err)
            res.json({message: err.message})
        }

        const {max_batch_no} = results[0];
        let batch_no;
        if (max_batch_no === null) {
            batch_no = 1;
        }
        else {
            batch_no = max_batch_no + 1;
        }

        //Query 4: Insert the same data that was inserted to inventory_in_item to stock table
        let q4 = `INSERT INTO stock SET batch_no = ${batch_no}, product_id = (SELECT product_id FROM product WHERE name = '${product_name}'), ` +
                    `quantity = ${stock_in_qty}, price = ${price}`;
        if (Array.isArray(product_name)) {
            for(let i = 0; i < product_name.length; i++) {
                q4 = `INSERT INTO stock SET batch_no = ${batch_no}, product_id = (SELECT product_id FROM product WHERE name = '${product_name[i]}'), ` +
                    `quantity = ${stock_in_qty[i]}, price = ${price[i]}`;
                connection.query(q4, (err, results) => {
                    if (err) {
                        console.error(err)
                        res.json({message: err.message})
                    }
                })
            }
            res.redirect('/AC7/inventory-in/confirmation');
        }
        else {
            connection.query(q4, (err, results) => {
                if (err) {
                    console.error(err)
                    res.json({message: err.message})
                }
                res.redirect('/AC7/inventory-in/confirmation');
            })
        }
        
    })
})



module.exports = router;