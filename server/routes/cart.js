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

router.use(express.json());


router.get('/:id', (req, res) => {

    // console.log('RUNNING .get("/cart/:id")')
    const {id: account_id} = req.params;
    let q = 'SELECT product.product_id, product.name, product.price, sale_item.quantity, sale.account_id FROM sale ' + 
            'INNER JOIN sale_item USING (sale_id) ' +
            'INNER JOIN product USING (product_id) ' +
            `WHERE sale.account_id = ${account_id} AND sale.sale_status = 'in progress'`;

    connection.query(q, function(err, results) {
        if (err) {
            console.log(err.message);
        }
        // console.log(results);

        res.json(results);
    });
});

router.post('/:a_id/:p_id', (req, res) => {
    const {a_id: account_id, p_id: product_id} = req.params;
    const {action} = req.body;
    let sign = '-';
    
    if (action === 'increment') {
        sign = '+';
    }
    else if (action === 'decrement') {
        sign = '-';
    }

    const q1 = `UPDATE sale_item INNER JOIN sale USING (sale_id) SET quantity = quantity ${sign} 1 ` +
                `WHERE account_id = ${account_id} ` +
                `AND sale_status = 'in progress' ` +
                `AND product_id = ${product_id}`;
    connection.query(q1, (err, results) => {
        if (err) { console.error(err) }
        else { console.log(`${sign} for product with ID of ${product_id} is successful!`) }
    })
})

module.exports = router;