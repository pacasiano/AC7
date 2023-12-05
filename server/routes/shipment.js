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
    let q = `SELECT shipped_sale.*, address.* FROM shipped_sale JOIN address ON shipped_sale.address_id = address.address_id WHERE shipped_sale.sale_id = ${sale_id}`;
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
    const q1 = `INSERT INTO shipped_sale SET sale_id = ${sale_id}, address_id = (SELECT address_id FROM sale WHERE sale_id = ${sale_id}), ` +
                `employee_id = (SELECT employee_id FROM employee WHERE account_id = ${account_id}), tracking_number = '${tracknum}', ` +
                `courier = '${courier}', payment = ${payment}`;
    connection.query(q1, (err, results) => {
        if (err) {
            console.error(err)
        }
        else {
            console.log('[Shipped sale] Query 1: Goods')
        }
    })

    //Change sale_status to shipped
    const q2 = `UPDATE sale SET sale_status = 'shipped' WHERE sale_id = ${sale_id}`
    connection.query(q2, (err, results) => {
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