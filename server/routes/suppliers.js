const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatamIdoing332',
    database: 'ac7_database'
})

router.get('/', (req, res) => {
    const q = 'SELECT name FROM supplier';
    connection.query(q, (err, results) => {
        res.json(results)
    })
})

module.exports = router;