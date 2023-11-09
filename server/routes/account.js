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

//Create new account
router.post('/', (req, res) => {
    //username must be unique
    const {username, password} = req.body;

    //Query 1: Create new account
    const q1 = `INSERT INTO account SET username = '${username}', password = '${password}', account_type = 'customer'`;
    connection.query(q1, (err, results) => {
        if (err) {console.error(err)}
        else {
            console.log('Step 1.1: Account creation successful')
            
        } 
    })

    //Query 2: Create and assign sale entry for new customer account
    const q2 = `INSERT INTO sale SET account_id = (SELECT account_id FROM account WHERE username = '${username}')`
    connection.query(q2, (err, results) => {
        if (err) {
            console.error(err)
        }
        else {
            console.log('Step 1.2: Account creation successful')
            res.json({
                message: 'FUCK YES!'
            })
        }
    })
})



module.exports = router;