const express = require('express')
const mysql = require('mysql2')
const router = express.Router();

router.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatamIdoing332',
    database: 'ac7_database'
});

//Changes the action of the returned_sale -- wait, we dont have a returned sale table yet, only return request
router.patch('/:id', (req, res) => {
    /*
    employee_id BIGINT UNSIGNED NOT NULL, -- get using account_id
    comment VARCHAR(255) NOT NULL, 
    action ENUM('refund', 'return and refund', 'reject') NOT NULL,
    status ENUM('active', 'inactive') NOT NULL DEFAULT 'inactive',
    refund_amount DECIMAL(10,2),
    */
   //so if return is rejected, what will its status be?
    const {action, account_id} = req.body;
    const {id: return_request_id} = req.params;
    const q = `INSERT INTO returned_sale `;
    connection.query(q, (err, results) => {

    })
})

module.exports = router;