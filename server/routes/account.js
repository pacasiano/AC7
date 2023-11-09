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

router.post('/', (req, res) => {
    //username must be unique
    const {username, password} = req.body;
    const q = `INSERT INTO account SET username = '${username}', password = '${password}', account_type = 'customer'`;
    connection.query(q, (err, results) => {
        if (err) {console.error(err)}
        else {
            console.log('Step 1: Account creation successful')
            // res.redirect('http://localhost:3000/AC7/sign-up/account-information');
            res.json({
                message: 'FUCK YES!'
            })
        } 
    })
})



module.exports = router;