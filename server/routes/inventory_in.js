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
    //need to update the quantity of the products if stock in was successful
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
                else {
                    console.log('Successfully inserted into inventory_in_item table');
                    //Query 3: Update the quantity of the products that are included in the stock in
                    let q3 = `UPDATE product SET quantity = quantity + ${stock_in_qty[i]} WHERE name = '${product_name[i]}'`
                    connection.query(q3, (err, results) => {
                        if(err) {
                            console.error(err)
                        }
                    })
                }
            })
        }
        res.redirect('http://localhost:3000/AC7/inventory-in/confirmation');
    }
    else {
        connection.query(q2, (err, results) => {
            if (err) {
                console.error(err)
            }
            else {
                console.log('Successfully inserted into inventory_in_item table')
                //Query 3: Update the quantity of the products that are included in the stock in

                let q3 = `UPDATE product SET quantity = quantity + ${stock_in_qty} WHERE name = '${product_name}'`
                connection.query(q3, (err, results) => {
                    if(err) {
                        console.error(err)
                    }
                })
                res.redirect('http://localhost:3000/AC7/inventory-in/confirmation');
            }
        })
    }
})

module.exports = router;