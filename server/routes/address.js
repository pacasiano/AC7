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
    const {name, baranggay, street, province, city, zip_code} = req.body
    const q = `INSERT INTO address SET customer_id = (SELECT customer_id FROM customer WHERE account_id = ${account_id}), ` +
            `name = '${name}', baranggay = '${baranggay}', street = '${street}', province = '${province}', city = '${city}', zip_code = '${zip_code}'`;
    connection.query(q, (err, results) => {
        if (err) {
            console.error(err)
        }
        else {
            res.redirect("http://localhost:3000/AC7/user/profile")
        }
    });
})

module.exports = router;