const express = require('express');
const app = express();
const router = express.Router();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');

app.use(cookieParser());
router.use(express.json())


const connection = require('../database');


router.post('/', (req, res) => {
    const { username, password } = req.body;

    let q = `SELECT account_id, username, password FROM account WHERE username = ?`;
    connection.query(q, [username], function (err, results) {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        //The inputted username exists
        if (results.length > 0) {
            try {
                const { account_id, password: dbPassword } = results[0];

                // if (password === dbPassword) {
                //         const expirationDate = new Date();
                //         expirationDate.setDate(expirationDate.getDate() + 30);
                //         res.cookie('account_id', `${account_id}`, { expires: expirationDate });
                //         res.json({ message: 'Correct' });
                //     } else {
                //         res.json({ message: 'Incorrect' });
                    
                //     }

                bcrypt.compare(password, dbPassword, function(err, result) {
                    if (result === true) {
                        const expirationDate = new Date();
                        expirationDate.setDate(expirationDate.getDate() + 30);
                        res.cookie('account_id', `${account_id}`, { expires: expirationDate });
                        res.json({ message: 'Correct' });
                    } else {
                        res.json({ message: 'Incorrect' });
                    }
                });

            } 
            catch (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            }
        } 
        else {
            res.json({ message: 'User not found' });
        }
    });
});


module.exports = router;