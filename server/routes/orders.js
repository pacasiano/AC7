const express = require('express');
const app = express();
const mysql = require('mysql2');
const router = express.Router();

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatamIdoing332', //enter your own password
    database: 'ac7_database'
});

router.get('/:id', (req, res) => {
    const { id: account_id } = req.params;
    let q = `SELECT sale_id, sale_date, sale_status FROM sale WHERE account_id = ${account_id}`;
    connection.query(q, function (err, results) {
        if (err) {
            console.log(err.message);
        }
        // console.log(results);

        res.json(results);
    });

});

module.exports = router;