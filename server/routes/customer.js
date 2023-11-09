const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const cookieParser = require('cookie-parser')

router.use(cookieParser())

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "whatamIdoing332",
    database: "ac7_database"    
})

router.post('/', (req, res) => {
    const {username} = req.cookies;
    console.log(username)
    console.log(req.cookies)
    const {first_name, middle_name, last_name, contact_info, email, address_name, street, barangay, province, city, zip_code} = req.body;

    //Query 1: Insert new customer entry
    const q1 = `INSERT INTO customer SET account_id = (SELECT account_id FROM account WHERE username = '${username}'), ` +
                `first_name = '${first_name}', middle_name = '${middle_name}', last_name = '${last_name}', contact_info = '${contact_info}', email = '${email}'`;
    connection.query(q1, (err, results) => {
        if (err) {
            console.error(err);
            //should display something when there's an error
        } 
        else {
            console.log('Step 2.1: Customer entry successfully created')
        }
    })

    //Query 2: Insert new address entry
    const q2 = `INSERT INTO address SET customer_id = (SELECT customer_id FROM customer INNER JOIN account USING (account_id) WHERE username = '${username}'), ` +
                `name = '${address_name}', street = '${street}', city = '${city}', barangay = '${barangay}', province = '${province}', zip_code = '${zip_code}'`;
    connection.query(q2, (err, results) => {
        if (err) {
            console.error(err);
            //should display something when there's an error
        } 
        else {
            console.log('Step 2.2: Address entry successfully created')
            res.redirect('http://localhost:3000/AC7/login')
        }
    })

})


module.exports = router;