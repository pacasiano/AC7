const express = require('express');
const router = express.Router();

const mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatamIdoing332', //enter your own password
    database: 'ac7_database'
});

router.get('/', (req, res) => {
    
    let q = 'SELECT sale_id, account_id, address_id, DATE_FORMAT(sale_date, \'%M %d, %Y\') AS sale_date, sale_status, ' + 
            'SUM(price * quantity) AS price ' +
            'FROM sale INNER JOIN sale_item USING (sale_id) ' +
            'INNER JOIN shipment USING (sale_id) ' +
            'GROUP BY sale_id';
    connection.query(q, function(error, results, fields) {
        if (error) throw error;
        res.json(results); //returns an array of obj literals in JSON format, each obj literal is a row from the query
        // connection.end();
    });

});

module.exports = router;