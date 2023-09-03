//return a json array of users (user data) which the react app will parse
const express = require('express');
const router = express.Router();

const mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatamIdoing332', //enter your own password
    database: 'ac7_database'
});

//this router will return a json obj containing a json array of users
router.get('/', (req, res) => {

    let q = 'SELECT * FROM customers';
    let users = connection.query(q, function(error, results, fields) {
        if (error) throw error;
        return results; //returns an array of obj literals, each obj literal is a row from users table
    });

    connection.end();

    res.json(users); //converts 'users' to JSON using JSON.stringify()
});

module.exports = router;