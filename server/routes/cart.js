const express = require('express');
const app = express();

const mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatamIdoing332', //enter your own password
    database: 'ac7_database'
});

app.get('/', (req, res) => {

    //shopping cart display-data needed: product.name, product.price,  
    let q = '';
    connection.query(q, function(err, results) {
        if (err) {
            console.log(err);
        }

        res.json(results);
    });
})

module.exports = app;