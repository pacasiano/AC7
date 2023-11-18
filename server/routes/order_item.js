const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatamIdoing332',
    database: 'ac7_database'
})

//Get all sale_item in the given sale_id
router.get('/:id', (req, res) => {
    const {id: sale_id} = req.params;
    const q = `SELECT sale_item.*, product.name FROM sale_item JOIN product ON sale_item.product_id = product.product_id WHERE sale_item.sale_id = ${sale_id};`
    connection.query(q, (err, results) => {
        if(err) {console.error(err)}
        else {
            res.json(results);
        }
    })
})

module.exports = router;