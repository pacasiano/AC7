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
    const q1 = `INSERT INTO inventory_out SET employee_id = (SELECT employee_id FROM employee WHERE account_id = ${account_id}), ` +
                `comment = '${general_comment}'`;
    connection.query(q1, (err, results) => {
        if (err) { console.error(err) }
        else { console.log('[Stock Out] Query 1: Successful') }
    })

    //Query 2: Create an inventory_out_item entry for every item that was stocked out
    if (isSingleItem) {
        //In this case, only 1 item is stocked out
        const q2 = `INSERT INTO inventory_out_item SET inventory_out_ref_num = (SELECT inventory_out_ref_num FROM inventory_out ORDER BY date DESC LIMIT 1), ` +
                    `product_id = (SELECT product_id FROM product WHERE name = '${product_name}'), comment = '${comments[1]}', quantity = ${quantity}`
        connection.query(q2, (err, results) => {
            if (err) { console.error(err) }
            else { console.log('[Stock Out] Query 2: Successful') }
        })
    }
    else {
        //In this case, multiple items are stocked out
        //Loop starts at 1 because we want to ignore index 0 of comments array (the general comment)
        for (let i = 1; i < comments.length; i++) {
            const q2 = `INSERT INTO inventory_out_item SET inventory_out_ref_num = (SELECT inventory_out_ref_num FROM inventory_out ORDER BY date DESC LIMIT 1), ` +
            `product_id = (SELECT product_id FROM product WHERE name = '${product_name[i-1]}'), comment = '${comments[i]}', quantity = ${quantity[i-1]}`;
            connection.query(q2, (err,  results) => {
                if(err) { console.error(err) }
                else { console.log('[Stock Out] Query 2: Successful') }
            })
        }
    }

    //Query 3: Stock out - Update stock row 
    if (isSingleItem) {
        const q3 = `UPDATE stock SET quantity = quantity - ${quantity} ` +
                    `WHERE product_id = (SELECT product_id FROM product WHERE name = '${product_name}') ` +
                    `AND batch_no = ${batch_no}`;
        connection.query(q3, (err, results) => {
            if (err) { console.error(err) }
            else { console.log('[Stock Out] Query 3: Successful') }
        })
    }
    else {
        for (let i = 0; i < quantity.length; i++) {
            const q3 = `UPDATE stock SET quantity = quantity - ${quantity[i]} ` +
                        `WHERE product_id = (SELECT product_id FROM product WHERE name = '${product_name[i]}') ` +
                        `AND batch_no = ${batch_no[i]}`;
            connection.query(q3, (err, results) => {
                if (err) { console.error(err) }
                else { console.log('[Stock Out] Query 3: Successful') }
            })
        }
    }

    res.redirect('/AC7/inventory-out/confirmation');
})

module.exports = router;