const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const connection = require('../database');

router.use(express.json())

//Create new account
router.post('/', (req, res) => {
    //username must be unique
    const {username, password, account_type = "customer"} = req.body;
    const saltRounds = 10;


    //Encrypt password
    bcrypt.hash(password, saltRounds, function(err, hash) {
        // Query 1: Create new account
        const q1 = `INSERT INTO account SET username = ?, password = ?, account_type = ?`;
        connection.query(q1, [username, hash, account_type], (err, results) => {
            if (err) {console.error(err)}
            else {
                console.log('Step 1.1: Account creation successful')
                if (account_type === 'employee') {
                    res.json({
                        message: 'good'
                    })
                }
            } 
        })
        
        if(account_type === "customer") {
            //Query 2: Create and assign sale entry for new customer account
            const q2 = `INSERT INTO sale SET account_id = (SELECT account_id FROM account WHERE username = ?)`
            connection.query(q2, [username], (err, results) => {
                if (err) {
                    console.error(err)
                }
                else {
                    console.log('Step 1.2: Account creation successful')
                    res.json({
                        message: 'good'
                    })
                }
            })
        }
    })
})

//Get account_type for authorization
router.get('/:id', (req, res) => {
    const {id: account_id} = req.params;
    try {
        const q1 = `SELECT account_type FROM account WHERE account_id = ?`;
        connection.query(q1, [account_id], (err, results) => {
            if(err) {
                console.error(err)
                res.json({message: 'No account logged in'})
            }
            else {
                const {account_type} = results;
                console.log(`Account with ID of ${account_id} is of type ${account_type}`)
                res.json(results)
            }
        })
    }
    catch (err) {
        res.json({message: 'No account logged in'})
    }
})

//Check if alpha account exists
router.get('/get/alpha', (req, res) => {
    const q = 'SELECT * FROM account WHERE username = \'alpha\'';
    connection.query(q, (err, results) => {
        if (results.length > 0) {
            res.json({message: 'exists'})
        }
        else {
            res.json({message: 'nonexistent'})
        }
    })
})

// Get all usernames to check availability
router.get('/', (req, res) => {
    const q = 'SELECT username FROM account';
    connection.query(q, (err, results) => {
        if (err) {
            console.error(err);
        } else {
            res.json(results);
            // console.log(results)
        }
    });
});

//Edit account information
router.patch('/:id', (req, res) => {
    console.log("Edit account info")
    const {id: account_id} = req.params;
    const {email, username, password} = req.body;
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, function(err, hash) {
        const q1 = `UPDATE account SET username = ?, password = ? WHERE account_id = ?`;
        connection.query(q1, [username, hash, account_id], (err, results) => {
            if (err) {
                console.error(err)
            } 
            else {
                console.log("Successfully editted acc info")
            }
        })
    })

    const q2 = `UPDATE customer SET email = ? WHERE account_id = ?`
    connection.query(q2, [email, account_id], (err, results) => {
        if (err) {
            console.error(err)
        }
    })

    res.json({message: "Goods 👍"})
})



module.exports = router;