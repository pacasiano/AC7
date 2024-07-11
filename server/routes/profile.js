const express = require('express');
const app = express();
const router = express.Router();

const connection = require('../database');


//Retrieve customer and account data for the user to display in 'Your Profile'
router.get('/:id', (req, res) => {
    const {id: account_id} = req.params
    
    const q = 'SELECT email, username, password, first_name, middle_name, last_name, contact_info ' + 
            `FROM customer INNER JOIN account USING (account_id) WHERE account_id = ?`;
    connection.query(q, [account_id], (err, results) => {
        res.json(results);
    })
})

module.exports = router;