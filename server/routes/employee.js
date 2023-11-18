const express = require('express')
const mysql = require('mysql2')
const router = express.Router();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "whatamIdoing332",
    database: "ac7_database"
})

//Get all employees
router.get('/', (req, res) => {
    const q = 'SELECT * FROM employee';
    connection.query(q, (err, results) => {
        if (err) {console.error(err)}
        else {
            res.json(results);
        }
    })
})

//Get an employee
router.get('/:id', (req, res) => {
    const {id : account_id} = req.params;
    const q = `SELECT first_name, last_name FROM employee WHERE account_id = ${account_id}`;
    connection.query(q, (err, results) => {
        if(err) {console.error(err)}
        else {
            res.json(results);
        }
    })
})

module.exports = router;