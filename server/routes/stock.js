const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatamIdoing332',
    database: 'ac7_database'
});

router.get('/:id', (req, res) => {
    const {id : product_id} = req.params;
    const q = `SELECT * FROM stock WHERE product_id = ${product_id} ` +
                `AND batch_no = (SELECT batch_no FROM (SELECT MIN(batch_no) AS batch_no FROM stock WHERE product_id = ${product_id} AND quantity > 0) as x)`;
    connection.query(q, (err, results) => {
        if (err) {
            console.error(results)
        }
        res.json(results[0])
    });
})

router.get('/:id/all', (req, res) => {
    const {id: product_id} = req.params;
    const q = `SELECT * FROM stock WHERE product_id = ${product_id}`;
    connection.query(q, (err, results) => {
        if (err) {
            console.error(err)
        }
        res.json(results)
    })
})

router.get('/', (req, res) => {
    const q = 'SELECT batch_no FROM stock ORDER BY date';
    connection.query(q, (err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.log(results);
            res.json(results);
        }
    });
});



module.exports = router;