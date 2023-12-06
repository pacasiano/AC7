const express = require('express');
const app = express();
const mysql = require('mysql2');
const router = express.Router();

router.use(express.json())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatamIdoing332',
    database: 'ac7_database'
})

router.get('/:id', (req, res) => {
    const {id : account_id} = req.params;

    const q = 'SELECT * FROM address ' + 
                `WHERE customer_id = (SELECT customer_id FROM customer WHERE account_id = ?) ` +
                'AND address_status = \'active\'';
    connection.query(q, [account_id], (err, results) => {
        res.json(results)
    })
})

router.post('/:id', (req, res) => {
    //Address table needs all the properties below + customer_id
    const {id: account_id} = req.params;
    const {name, barangay, street, province, city, zip_code} = req.body

    const q = `INSERT INTO address SET customer_id = (SELECT customer_id FROM customer WHERE account_id = ?), ` +
            `name = ?, barangay = ?, street = ?, province = ?, city = ?', zip_code = ?`;
    connection.query(q, [account_id, name, barangay, street, province, city, zip_code], (err, results) => {
        if (err) {
            console.error(err)
            res.json( {Error: err.message} )
        }
        else {
            res.json("success")
        }
    });
})

router.delete('/:id', (req, res) => {
    const {id: address_id} = req.params;
    const q1 = `UPDATE address SET address_status = 'inactive' WHERE address_id = ?`;
    connection.query(q1, [address_id], (err, results) => {
        if(err) {console.error(err)}
        else {
            res.json({message: `Successfully deleted Address with ID of ${address_id}👍`})
        }
    })
})

router.patch('/:id', (req, res) => {
    const {id: address_id} = req.params;
    const {name, barangay, street, province, city, zip_code} = req.body;

    const q = `UPDATE address SET name = ?, barangay = ?, street = ?, ` +
                `province = ?, city = ?, zip_code = ?` +
                `WHERE address_id = ${address_id}`;
    connection.query(q, [name, barangay, street, province, city, zip_code], (err, results) => {
        if (err) {
            console.error(err.message)
        }
        else {
            console.log('Address successfully edited!')
            res.json({message: 'Address successfully edited!'})
        }
    })
})

module.exports = router;