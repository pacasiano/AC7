const express = require('express');
const app = express();
const router = express.Router();

const cookieParser = require('cookie-parser');

app.use(cookieParser());
router.use(express.json())

const mysql = require('mysql2');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatamIdoing332', //enter your own password
    database: 'ac7_database'
});

router.post('/', (req, res) => {
    console.log(req.body)
    const {username, password} = req.body;
    try {
        console.log('Receieved username: ' + username)
        console.log('Receieved password: ' + password)
    }
    catch (err) {
        // res.json("Incorrect")
        console.log(err)
    }

    let q = `SELECT account_id, username, password, account_type FROM account WHERE username = '${username}'`;
    connection.query(q, function(err, results) {
        if (err) { 
            console.error(err)
            res.json({message: 'Invalid username or password'})
        };
        //results is an array of objects, results[0] assumes that we want the first row which should be valid if username is unique
        if (results.length > 0) { //at least 1 row is returned from the query (username exists)
            try {
                const {account_id, username: dbUsername, password: dbPassword, account_type} = results[0]; //need to add some error handling
                console.log("DB user: " + dbUsername);
                console.log("DB pw: " + dbPassword);
                if (password === dbPassword) {
                    const expirationDate = new Date(); //create a new date
                    expirationDate.setDate(expirationDate.getDate() + 30); //set the date to the current time when user logs in then add 30 days to it
                    res.cookie('account_id', `${account_id}`, {expires: expirationDate}) //cookie expires in 30 days
                    if (account_type === 'customer') {
                        res.redirect('http://localhost:3000/AC7/');
                    }
                    else {
                        res.redirect('http://localhost:3000/AC7/');
                    }
                }else {
                    res.send("Incorrect password!")
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            res.send("Username doesn't exist!")
        }
        // res.json(results); //returns an array of obj literals in JSON format, each obj literal is a row from users table
        // connection.end()
    });
});

module.exports = router;