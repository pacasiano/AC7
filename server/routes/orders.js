const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

router.use(express.json())

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatamIdoing332', //enter your own password
    database: 'ac7_database'
});

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

router.get('/orders/:id', (req, res) => {
    const { id: account_id } = req.params;
    let q = 'SELECT sale_id, DATE_FORMAT(sale_date, \'%M %d, %Y\') AS sale_date, sale_status, ' + //i removed received_date bc no longer in db
            'sale_payment.amount AS amount FROM sale ' +
            'LEFT JOIN shipped_sale USING (sale_id) ' +
            'INNER JOIN sale_payment USING (sale_id) ' +
            `WHERE account_id = ${account_id}`;
    connection.query(q, function (err, results) {
        if (err) {
            console.log(err.message);
        }
        // console.log(results);
        res.json(results);
    });
});

router.get('/:id', (req, res) => {
    const { id: sale_id } = req.params;
    let q = 'SELECT sale_status FROM sale WHERE sale_id = ' + sale_id;
    connection.query(q, function (err, results) {
        if (err) {
            console.log(err.message);
        }
        // console.log(results);
        res.json(results);
    });
});

//Update sale_status
router.patch('/:id', (req, res) => {
    const {id: sale_id} = req.params;
    const {new_sale_status} = req.body;
    const q = `UPDATE sale SET sale_status = '${new_sale_status}' WHERE sale_id = ${sale_id}`;
    connection.query(q, (err, results) => {
        if (err) {
            console.error(err)
            res.json({message: err.message})
        }
        else {
            console.log(`Sale_status of Sale with ID ${sale_id} has been changed to ${new_sale_status}`)
            res.json({message: `Sale_status of Sale with ID ${sale_id} has been changed to ${new_sale_status}`})
        }
    })
})

router.get('/sale_items/:id', (req, res) => {
    const { id: sale_id } = req.params;
    let q = `SELECT sale_item.*, product.name FROM sale_item JOIN product ON sale_item.product_id = product.product_id WHERE sale_item.sale_id = ${sale_id}`;
    console.log('Query:', q);

    connection.query(q, function (err, results) {
        if (err) {
            console.error('Error:', err);
            res.json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });

});

module.exports = router;    