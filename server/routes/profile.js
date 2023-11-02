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

router.get('/:id', (req, res) => {
    const {id: account_id} = req.params
    
    const q = 'SELECT email, username, password, first_name, middle_name, last_name, contact_info ' + 
            `FROM customer INNER JOIN account USING (account_id) WHERE account_id = ${account_id}`;
    connection.query(q, (err, results) => {
        res.json(results);
    })
})

module.exports = router;