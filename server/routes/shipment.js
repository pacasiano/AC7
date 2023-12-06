const express = require('express');
const app = express();
const mysql = require('mysql2');
const router = express.Router();

router.use(express.json())

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatamIdoing332', //enter your own password
    database: 'ac7_database'
});

router.get('/:id', (req, res) => {
    const { id: sale_id } = req.params;
    let q = `SELECT *, DATE_FORMAT(shipped_sale.date, '%M %d, %Y') AS shipped_date, DATE_FORMAT(completed_sale.date, '%M %d, %Y') AS completed_date 
    FROM sale 
    INNER JOIN address USING (address_id) 
    INNER JOIN shipped_sale USING (sale_id)
    LEFT JOIN completed_sale USING (sale_id)
    WHERE sale_id = ?`;
    connection.query(q, [sale_id], function (err, results) {
        if (err) {
            console.log(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (!results || results.length === 0) {
            res.status(404).json({ error: 'Not Found' });
            return;
        }

        res.json(results);
    });
});



router.get('/', (req, res) => {
    let q = `SELECT tracking_number FROM shipped_sale`;
    connection.query(q, function (err, results) {
        if (err) {
            console.log(err.message);
        }
        // console.log(results);
        res.json(results);
    });
});

router.post('/:id', (req, res) => {
    const {id: sale_id} = req.params;
    const {tracknum, courier, payment, account_id} = req.body;
    //Insert into shipped_sale the details of shipment
    const q1 = `INSERT INTO shipped_sale SET sale_id = ?, address_id = (SELECT address_id FROM sale WHERE sale_id = ?), ` +
                `employee_id = (SELECT employee_id FROM employee WHERE account_id = ?), tracking_number = ?, ` +
                `courier = ?, payment = ?`;
    connection.query(q1, [sale_id, sale_id, account_id, tracknum, courier, payment], (err, results) => {
        if (err) {
            console.error(err)
        }
        else {
            console.log('[Shipped sale] Query 1: Goods')
        }
    })

    //Change sale_status to shipped
    const q2 = `UPDATE sale SET sale_status = 'shipped' WHERE sale_id = ?`
    connection.query(q2, [sale_id], (err, results) => {
        if (err) {
            console.error(err)
        }
        else {
            console.log('[Shipped sale] Query 2: Goods')
            res.json({message: 'Goods'})
        }
    })
})

module.exports = router;