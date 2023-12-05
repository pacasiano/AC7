const express = require('express');
const app = express();
const mysql = require('mysql2');
const router = express.Router();

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatamIdoing332', //enter your own password
    database: 'ac7_database'
});

router.get('/:id', (req, res) => {
    const { id: sale_id } = req.params;
    let q = `SELECT shipment.*, address.* FROM shipment JOIN address ON shipment.address_id = address.address_id WHERE shipment.sale_id = ${sale_id}`;
    connection.query(q, function (err, results) {
        if (err) {
            console.log(err.message);
        }
        // console.log(results);
        res.json(results);
    });
});

router.get('/', (req, res) => {
    let q = `SELECT tracking_number FROM shipment`;
    connection.query(q, function (err, results) {
        if (err) {
            console.log(err.message);
        }
        // console.log(results);
        res.json(results);
    });
});

module.exports = router;