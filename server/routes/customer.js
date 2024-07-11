const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser')

router.use(cookieParser())
router.use(express.json())

const connection = require('../database');

//Get all customers
router.get('/', (req, res) => {
    const q = 'SELECT * FROM customer';
    connection.query(q, function(error, results, fields) {
        if (error) {console.error(error)}
        else {
            res.json(results); //returns an array of obj literals in JSON format, each obj literal is a row from users table
        }
    });
});

// Get a particular customer's info
router.get('/username/:username', (req, res) => {
    const q = 'SELECT * FROM customer WHERE username = ?';
    connection.query(q, [req.params.username], function(error, results, fields) {
        if (error) {
            console.error(error);
            res.json('wala')
        } else {
            res.json("meron") // returns an array of obj literals in JSON format, each obj literal is a row from the users table
        }
    });
});

//Create a new customer
router.post('/', (req, res) => {
    const {username} = req.cookies;
    console.log(username)
    console.log(req.cookies)
    const {first_name, middle_name, last_name, contact_info, email, address_name, street, barangay, province, city, zip_code} = req.body;

    //Query 1: Insert new customer entry
    const q1 = `INSERT INTO customer SET account_id = (SELECT account_id FROM account WHERE username = ?), ` +
                `first_name = ?, middle_name = ?, last_name = ?, contact_info = ?, email = ?`;
    connection.query(q1, [username, first_name, middle_name, last_name, contact_info, email], (err, results) => {
        if (err) {
            console.error(err);
            //should display something when there's an error
        } 
        else {
            console.log('Step 2.1: Customer entry successfully created')
        }
    })

    //Query 2: Insert new address entry
    const q2 = `INSERT INTO address SET customer_id = (SELECT customer_id FROM customer INNER JOIN account USING (account_id) WHERE username = ?), ` +
                `name = ?, street = ?, city = ?, barangay = ?, province = ?, zip_code = ?`;
    connection.query(q2, [username, address_name, street, city, barangay, province, zip_code], (err, results) => {
        if (err) {
            console.error(err);
            //should display something when there's an error
        } 
        else {
            console.log('Step 2.2: Address entry successfully created')
            res.json({message: "Goods 👍"})
        }
    })
})

//Edit a customer's info
router.patch('/:id', (req, res) => {
    console.log("Edit Personal Info")
    const {first_name, middle_name, last_name, contact_info} = req.body;
    const {id: account_id} = req.params;
    const q1 = `UPDATE customer SET first_name = ?, middle_name = ?, last_name = ?, ` + 
                `contact_info = ? WHERE account_id = ?`;
    connection.query(q1, [first_name, middle_name, last_name, contact_info, account_id], (err, results) => {
        if(err) {
            console.error(err)
        }
        res.json({message: "Goods 👍"})
    })
})


module.exports = router;