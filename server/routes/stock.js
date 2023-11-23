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
                'ORDER BY date LIMIT 1';
    connection.query(q, (err, results) => {
        if (err) {
            console.error(results)
            res.json({message: err.message})
        }
        res.json(results[0])
    });
})

router.get('/', (req, res) => {
    const q = 'SELECT batch_no FROM stock ORDER BY date';
    connection.query(q, (err, results) => {
        if (err) {
            console.error(err);
            res.json({ message: err.message });
        } else {
            console.log(results);
            res.json(results);
        }
    });
});



module.exports = router;