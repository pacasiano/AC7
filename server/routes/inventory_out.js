const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatamIdoing332',
    database: 'ac7_database'
})

router.post('/', (req, res) => {
    const {account_id, comments, product_name, quantity, batch_no} = req.body;
    //'comments' is always an array with a minimum of 2 elements (General comment and 1 comment from a product being stocked out)
    //product_name and quantity are arrays if there's more than 1 item stocked out, else theyre string/int
    const general_comment = comments[0] || 'none';
    const isSingleItem = comments.length === 2 ? true : false; 

    console.log('Inventory out...')
    console.log(req.body)

    //Query 1: Create a new inventory_out entry
    const q1 = `INSERT INTO inventory_out SET employee_id = (SELECT employee_id FROM employee WHERE account_id = ?), ` +
                `comment = ?`;
    connection.query(q1, [account_id, general_comment], (err, results) => {
        if (err) { console.error(err) }
        else { console.log('[Stock Out] Query 1: Successful') }
    })

    //Query 2: Create an inventory_out_item entry for every item that was stocked out
    if (isSingleItem) {
        //In this case, only 1 item is stocked out
        const q2 = `INSERT INTO inventory_out_item SET inventory_out_ref_num = (SELECT inventory_out_ref_num FROM inventory_out ORDER BY date DESC LIMIT 1), ` +
                    `product_id = (SELECT product_id FROM product WHERE name = ?), comment = ?, quantity = ?`
        connection.query(q2, [product_name, comments[1], quantity], (err, results) => {
            if (err) { console.error(err) }
            else { console.log('[Stock Out] Query 2: Successful') }
        })
    }
    else {
        //In this case, multiple items are stocked out
        //Loop starts at 1 because we want to ignore index 0 of comments array (the general comment)
        for (let i = 1; i < comments.length; i++) {
            const q2 = `INSERT INTO inventory_out_item SET inventory_out_ref_num = (SELECT inventory_out_ref_num FROM inventory_out ORDER BY date DESC LIMIT 1), ` +
            `product_id = (SELECT product_id FROM product WHERE name = ?), comment = ?, quantity = ?`;
            connection.query(q2, [product_name[i-1], comments[i], quantity[i-1]], (err,  results) => {
                if(err) { console.error(err) }
                else { console.log('[Stock Out] Query 2: Successful') }
            })
        }
    }

    //Query 3: Stock out - Update stock row 
    if (isSingleItem) {
        const q3 = `UPDATE stock SET quantity = quantity - ? ` +
                    `WHERE product_id = (SELECT product_id FROM product WHERE name = ?) ` +
                    `AND batch_no = ?`;
        connection.query(q3, [quantity, product_name, batch_no], (err, results) => {
            if (err) { console.error(err) }
            else { console.log('[Stock Out] Query 3: Successful') }
        })
    }
    else {
        for (let i = 0; i < quantity.length; i++) {
            const q3 = `UPDATE stock SET quantity = quantity - ? ` +
                        `WHERE product_id = (SELECT product_id FROM product WHERE name = ?) ` +
                        `AND batch_no = ?`;
            connection.query(q3, [quantity[i], product_name[i], batch_no[i]], (err, results) => {
                if (err) { console.error(err) }
                else { console.log('[Stock Out] Query 3: Successful') }
            })
        }
    }

    res.redirect('/AC7/inventory-out/confirmation');
})

    // selects all from inventory_in
    router.get('/out', (req, res) => {
        let q = `SELECT * FROM inventory_out`;
        connection.query(q, function (err, results) {
            if (err) {
                console.log(err.message);
            }
            // console.log(results);
            res.json(results);
        });
    });

    // selects all from where inventory_in_id = id
    router.get('/out/:id', (req, res) => {
        let q = `SELECT * FROM inventory_out_item WHERE inventory_out_ref_num = ?`;
        connection.query(q, [req.params.id], function (err, results) {
            if (err) {
                console.log(err.message);
            }
            // console.log(results);
            res.json(results);
        });
    });

module.exports = router;