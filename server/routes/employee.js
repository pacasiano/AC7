const express = require('express')
const mysql = require('mysql2')
const router = express.Router();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "whatamIdoing332",
    database: "ac7_database"
})

router.get('/', (req, res) => {
    const q = 'SELECT * FROM employee';
    connection.query(q, (err, results) => {
        if (err) {console.error(err)}
        else {
            res.json(results);
        }
    })
})


module.exports = router;