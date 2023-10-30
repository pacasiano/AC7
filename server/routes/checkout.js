const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatamIdoing332', //enter your own password
    database: 'ac7_database'
});

router.post('/', (req, res) => {
    //query should create a new address row
    //but what the fuck do i do with the firstName, lastName, and contactNumber?
    let q = '';
    const {paymentMethod, firstName, lastName, contactNumber, brgy, street, province, city, zipcode} = req.body;
    if (paymentMethod === 'gcash') {
        const {gcashNumber} = req.body;
        q = '';
    }
    connection.query(q, function(err, results) {
        
    })
})


module.exports = router;
