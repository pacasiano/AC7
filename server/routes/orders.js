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
    
    let q = 'SELECT sale.sale_id AS sale_id, sale.account_id AS account_id, ' +
            'sale_item.product_id AS product_id, sale.address_id AS address_id, sale_date, sale_status, ' +
            'sale_item.quantity AS quantity, sale_item.price AS price ' +
            'FROM sale INNER JOIN sale_item USING (sale_id)';
    connection.query(q, function(error, results, fields) {
        if (error) throw error;
        res.json(results); //returns an array of obj literals in JSON format, each obj literal is a row from the query
    });

});

module.exports = router;