const express = require('express');

const app = express();
const router = express.Router();

const connection = require('../database');


router.post('/', (req, res) => {
    //need to insert into 2 tables: inventory_in && inventory_in_item
    //need to create a row in inventory_in_item for each product_id
    //whatever you insert into inventory_in_item, also insert that into stock table
    console.log('STOCK IN')
    console.log(req.body)
    const {supplier_name, payment_amount, product_name, price, quantity: stock_in_qty} = req.body; //all of these values must be required

    //Query 1: Insert a new row into inventory_in (hopefully all supplier names are unique, else we're fcked)
    const q1 = `INSERT INTO inventory_in SET supplier_id = (SELECT supplier_id FROM supplier WHERE name = ?), ` + 
                `payment_amount = ?`;
    connection.query(q1, [supplier_name, payment_amount], (err, results) => {
        if (err) {
            console.error(err)
        }
        else {
            console.log('[Stock In] Query 1: Successful')
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
                    console.log('[Stock In] Query 2: Successful')
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

    //Query 3: Get the latest batch_no for each product
    if (Array.isArray(product_name)) {
        for (let i = 0; i < product_name.length; i++) {
            const q3 = `SELECT MAX(batch_no) AS max_batch_no FROM stock WHERE product_id = (SELECT product_id FROM product WHERE name = '${product_name[i]}')`;
            connection.query(q3, (err, results) => {
                if (err) {
                    console.error(err)
                }
                else {
                    console.log('[Stock In] Query 3: Successful')
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
                const q4 = `INSERT INTO stock SET batch_no = ${batch_no}, product_id = (SELECT product_id FROM product WHERE name = '${product_name[i]}'), ` +
                            `quantity = ${stock_in_qty[i]}, price = ${price[i]}`;
                connection.query(q4, (err, results) => {
                    if (err) {
                        console.error(err.message)
                    }
                    else {
                        console.log('[Stock In] Query 4: Successful')
                    }
                })
            })
        }
        res.redirect('/AC7/inventory-in/confirmation');
    }
    else {
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
            const q4 = `INSERT INTO stock SET batch_no = ${batch_no}, product_id = (SELECT product_id FROM product WHERE name = '${product_name}'), ` +
                        `quantity = ${stock_in_qty}, price = ${price}`;
            connection.query(q4, (err, results) => {
                if (err) {
                    console.error(err)
                }
                else {
                    res.redirect('/AC7/inventory-in/confirmation');
                }
            })
        })
    }
})

    // selects all from inventory_in
    router.get('/in', (req, res) => {
        let q = `SELECT * FROM inventory_in`;
        connection.query(q, function (err, results) {
            if (err) {
                console.log(err.message);
            }
            // console.log(results);
            res.json(results);
        });
    });

    // selects all from where inventory_in_id = id
    router.get('/in/:id', (req, res) => {
        let q = `SELECT * FROM inventory_in_item WHERE inventory_in_id = ?`;
        connection.query(q, [req.params.id], function (err, results) {
            if (err) {
                console.log(err.message);
            }
            // console.log(results);
            res.json(results);
        });
    });



module.exports = router;