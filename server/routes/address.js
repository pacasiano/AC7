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

// /:id here is for the account_id
router.post('/:id', (req, res) => {
    //Address table needs all the properties below + customer_id
    const {id: account_id} = req.params;
    const {name, barangay, street, province, city, zip_code} = req.body
    const q = `INSERT INTO address SET customer_id = (SELECT customer_id FROM customer WHERE account_id = ${account_id}), ` +
            `name = '${name}', barangay = '${barangay}', street = '${street}', province = '${province}', city = '${city}', zip_code = '${zip_code}'`;
    connection.query(q, (err, results) => {
        if (err) {
            console.error(err)
        }
        else {
            res.redirect("http://localhost:3000/AC7/user/profile")
        }
    });
})

router.get('/:id', (req, res) => {
    const {id : account_id} = req.params;
    const q = 'SELECT name, city, zip_code, barangay, province, street FROM address ' + 
                `WHERE customer_id = (SELECT customer_id FROM customer WHERE account_id = ${account_id})`;
    connection.query(q, (err, results) => {
        res.json(results)
    })
})

module.exports = router;