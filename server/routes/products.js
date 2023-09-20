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
    
    let q = 'SELECT product_id, name, description, price FROM product';
    connection.query(q, function(error, results, fields) {
        if (error) throw error;
        // console.log(results);
        // console.log(JSON.stringify(results));
        res.json(results); //returns an array of obj literals in JSON format, each obj literal is a row from the query
        // connection.end();
    });

});

module.exports = router;