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

router.get('/', (req, res) => {
    
    let q = 'SELECT sale_id, account_id, CONCAT(first_name, \' \', last_name) AS full_name, DATE_FORMAT(sale_date, \'%M %d, %Y - %r\') AS sale_date, ' +
            'sale_status, SUM(price * quantity) AS price ' +
            'FROM sale LEFT JOIN sale_item USING (sale_id) ' +
            'LEFT JOIN shipment USING (sale_id) ' +
            'INNER JOIN customer USING (account_id) ' +
            'GROUP BY sale_id, customer_id ' +
            'ORDER BY sale.sale_date DESC';
    connection.query(q, function(error, results, fields) {
        if (error) throw error;
        res.json(results); //returns an array of obj literals in JSON format, each obj literal is a row from the query
        // connection.end();
    });
});

router.get('/:id', (req, res) => {
    const { id: account_id } = req.params;
    let q = 'SELECT sale_id, DATE_FORMAT(sale_date, \'%M %d, %Y\') AS sale_date, sale_status, DATE_FORMAT(received_date, \'%M %d, %Y\') as received_date FROM sale ' +
            `LEFT JOIN shipment USING (sale_id) WHERE account_id = ${account_id}`;
    connection.query(q, function (err, results) {
        if (err) {
            console.log(err.message);
        }
        // console.log(results);
        res.json(results);
    });
});



module.exports = router;    