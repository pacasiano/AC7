const express = require('express')
const mysql = require('mysql2')
const router = express.Router();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "whatamIdoing332",
    database: "ac7_database"
})

router.use(express.json())

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

//Create new employee
router.post('/', (req, res) => {
    const {username, first_name, middle_name = '', last_name, position, contact_info} = req.body;
    const q = `INSERT INTO employee SET account_id = (SELECT account_id FROM account WHERE username = '${username}'), ` +
                `first_name = '${first_name}', middle_name = '${middle_name}', last_name = '${last_name}', ` +
                `position = '${position}', contact_info = '${contact_info}'`
    connection.query(q, (err, results) => {
        if (err) { 
            console.error(err)
            res.json({message: err.message})
        }
        else {
            res.json({message: 'Employee account creation successful!'})
        } 
    })
})

module.exports = router;