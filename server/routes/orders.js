const express = require('express');

const router = express.Router();

router.use(express.json())

const connection = require('../database');


router.get('/', (req, res) => {
    
    let q = 'SELECT sale_id, account_id, CONCAT(first_name, \' \', last_name) AS full_name, DATE_FORMAT(sale_date, \'%M %d, %Y - %r\') AS sale_date, ' +
            'sale_status, SUM(price * quantity) AS price ' +
            'FROM sale LEFT JOIN sale_item USING (sale_id) ' +
            'LEFT JOIN shipped_sale USING (sale_id) ' +
            'INNER JOIN customer USING (account_id) ' +
            'WHERE sale_status != \'cart\' ' +
            'GROUP BY sale_id, customer_id ' +
            'ORDER BY sale.sale_date DESC';
    connection.query(q, function(error, results, fields) {
        if (error) throw error;
        res.json(results); //returns an array of obj literals in JSON format, each obj literal is a row from the query
        // connection.end();
    });
});

//For ordersReturn.js (Return Requests)
router.get('/return_request', (req, res) => {

    const q = 'SELECT sale.sale_id AS sale_id, account_id, return_request_id, CONCAT(first_name, \' \', last_name) AS full_name, ' +
                'DATE_FORMAT(sale_date, \'%M %d, %Y - %r\') AS sale_date, SUM(price * quantity) AS price, ' +
                'return_request.comment AS comment, return_request_img.img_url AS img ' +
                'FROM return_request ' +
                'INNER JOIN return_request_img USING (return_request_id) ' +
                'INNER JOIN sale USING (sale_id) ' +
                'INNER JOIN sale_item USING (sale_id) ' +
                'INNER JOIN customer USING (account_id) ' +
                'WHERE sale_status = \'processing return\' ' +
                'GROUP BY sale_id, return_request_id, return_request_img.img_url, customer_id ' +
                'ORDER BY sale_date';
    connection.query(q, (err, results) => {
        if (err) console.log(err)
        else {
            res.json(results)
        }
    })
})

router.get('/orders/:id', (req, res) => {
    const { id: account_id } = req.params;
    let q = 'SELECT sale_id, DATE_FORMAT(sale_date, \'%M %d, %Y\') AS sale_date, sale_status, ' + 
            'sale_payment.amount AS amount, DATE_FORMAT(shipped_sale.date, \'%M %d, %Y\') AS shipped_date, ' +
            'DATE_FORMAT(completed_sale.date, \'%M %d, %Y\') AS received_date, ' +
            'DATE_FORMAT(cancelled_sale.date, \'%M %d, %Y\') AS cancelled_date, ' +
            'DATE_FORMAT(return_request.date, \'%M %d, %Y\') AS return_request_date ' +
            'FROM sale ' +
            'LEFT JOIN shipped_sale USING (sale_id) ' +
            'LEFT JOIN completed_sale USING (sale_id) ' +
            'LEFT JOIN cancelled_sale USING (sale_id) ' +
            'LEFT JOIN return_request USING (sale_id) ' +
            'INNER JOIN sale_payment USING (sale_id) ' +
            `WHERE account_id = ?`;
    connection.query(q, [account_id], function (err, results) {
        if (err) {
            console.log(err.message);
        }
        // console.log(results);
        res.json(results);
    });
});

router.get('/:id', (req, res) => {
    const { id: sale_id } = req.params;
    let q = 'SELECT sale_status FROM sale WHERE sale_id = ?';
    connection.query(q, [sale_id], function (err, results) {
        if (err) {
            console.log(err.message);
        }
        // console.log(results);
        res.json(results);
    });
});

//Update sale_status -- only use this end point when changing the sale_status to 'packed, completed, or cancelled'
router.patch('/:id', (req, res) => {
    const {id: sale_id} = req.params;
    const {new_sale_status, account_id} = req.body;
    const q = `UPDATE sale SET sale_status = ? WHERE sale_id = ?`;
    connection.query(q, [new_sale_status, sale_id], (err, results) => {
        if (err) {
            console.error(err)
            res.json({message: err.message})
        }
        else {
            console.log(`Sale_status of Sale with ID ${sale_id} has been changed to ${new_sale_status}`)
        }
    })

    if (new_sale_status === 'packed') {
        const q2 = `INSERT INTO packed_sale SET sale_id = ?, ` +
                    `employee_id = (SELECT employee_id FROM employee WHERE account_id = ?)`;
        connection.query(q2, [sale_id, account_id], (err, results) => {
            if (err) console.error(err)
            else {
                console.log(`New entry in packed_sale table: Sale ID of ${sale_id}`)
            }
        })
    }
    else {
        const q2 = `INSERT INTO ?_sale SET sale_id = ?`
        connection.query(q2, [new_sale_status, sale_id], (err, results) => {
            if (err) {
                console.error(err) 
            }
            else {
                console.log(`New entry in ${new_sale_status}_sale table: Sale ID of ${sale_id}`)
            }
        })
    }

    res.json({message: `Sale_status of Sale with ID ${sale_id} has been changed to ${new_sale_status}`})
})

router.get('/sale_items/:id', (req, res) => {
    const { id: sale_id } = req.params;
    let q = `SELECT sale_item.*, product.name FROM sale_item JOIN product ON sale_item.product_id = product.product_id WHERE sale_item.sale_id = ?`;

    connection.query(q, [sale_id], function (err, results) {
        if (err) {
            console.error('Error:', err);
            res.json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });

});

module.exports = router;    