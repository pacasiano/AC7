const express = require('express');
const router = express.Router();

const connection = require('../database');


router.get('/:id', (req, res) => {
    const {id : product_id} = req.params;
    const q = `SELECT * FROM stock WHERE product_id = ? ` +
                `AND batch_no = (SELECT batch_no FROM (SELECT MAX(batch_no) AS batch_no FROM stock WHERE product_id = ? AND quantity > 0) as x)`;
    connection.query(q, [product_id, product_id], (err, results) => {
        if (err) {
            console.error(results)
        }
        res.json(results[0])
    });
})

router.get('/:id/all', (req, res) => {
    const {id: product_id} = req.params;
    const q = `SELECT batch_no, price, quantity, DATE_FORMAT(date, '%M %d, %Y') AS date FROM stock WHERE product_id = ?`;
    connection.query(q, [product_id], (err, results) => {
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