const express = require('express');
const app = express();

const mysql = require('mysql2');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatamIdoing332', //enter your own password
    database: 'ac7_database'
});

//parse/extract data from a <form>
app.use(express.urlencoded( { extended: true } ));

app.post('/api/login', (req, res) => {
    const {username, password} = req.body;
    // try {
    //     console.log('Receieved username: ' + req.body.username)
    // }
    // catch (err) {
    //     console.log(err)
    // }

    let q = `SELECT username, password FROM account WHERE username = '${username}'`;
    connection.query(q, function(error, results, fields) {
        if (error) throw error;
        //results is an array of objects, results[0] assumes that we want the first row which should be valid if username is unique
        const {username: dbUsername, password: dbPassword} = results[0]; 
        console.log("DB user: " + dbUsername);
        console.log("DB pw: " + dbPassword);
        if (password === dbPassword) {
            //log the user in
            res.redirect('http://localhost:3000/AC7/home');
        }
        // res.json(results); //returns an array of obj literals in JSON format, each obj literal is a row from users table
        // connection.end()
    });
});

module.exports = app;