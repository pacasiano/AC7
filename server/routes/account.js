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

//Get account_type for authorization
router.get('/:id', (req, res) => {
    const {id: account_id} = req.params;
    const q1 = `SELECT account_type FROM account WHERE account_id = ${account_id}`;
    connection.query(q1, (err, results) => {
        if(err) {
            console.error(err)
        }
        else {
            const {account_type} = results[0];
            console.log(`Account with ID of ${account_id} is of type ${account_type}`)
            res.json(results)
        }
    })
})

//Edit account information
router.patch('/:id', (req, res) => {
    console.log("Edit account info")
    const {id: account_id} = req.params;
    const {email, username, password} = req.body;
    console.log(req.body)
    const q1 = `UPDATE account SET username = '${username}', password = '${password}' WHERE account_id = ${account_id}`;
    connection.query(q1, (err, results) => {
        if (err) {
            console.error(err)
        } 
        else {
            console.log("Successfully editted acc info")
        }
    })

    const q2 = `UPDATE customer SET email = '${email}' WHERE account_id = ${account_id}`
    connection.query(q2, (err, results) => {
        if (err) {
            console.error(err)
        }
    })

    res.json({message: "Goods 👍"})
})



module.exports = router;