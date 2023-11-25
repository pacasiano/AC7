const express = require('express');
const router = express.Router();

const mysql = require('mysql2');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'whatamIdoing332', //enter your own password
    database: 'ac7_database'
});

//Retrieve every product's detail (To display in components/inventory.js)
router.get('/', (req, res) => {
    const q = 'SELECT product_id, name, description, category, threshold, SUM(quantity) AS quantity FROM product ' +
            'LEFT JOIN stock USING (product_id) ' +
            'GROUP BY product_id, threshold';
    connection.query(q, function(err, results, fields) {
        if (err) {
            console.error(err); 
            res.json({message: err.message});
        }
        res.json(results); //returns an array of obj literals in JSON format, each obj literal is a row from the query
    });

});

//Retrieve a particular product's data (To display in pages/product.js)
router.get('/:id', (req, res) => {
    const {id: product_id} = req.params;
    const q = `SELECT * FROM product INNER JOIN stock USING (product_id) WHERE product_id = ${product_id} ` +
            `AND batch_no = (SELECT MIN(batch_no) FROM stock WHERE quantity > 0 AND product_id = ${product_id})`;
    connection.query(q, (err, results) => {
        if (err) {
            console.error(err)
        }
        else {
            res.json(results[0])
        }
    })
})

//Add new product
router.post('/', (req, res) => {
    const {product_name, description, category, threshold} = req.body;
    console.log('Adding new product...')
    console.log(req.body)
    const q1 = `INSERT INTO product SET name = '${product_name}', description = '${description}', ` +
                `category = '${category}', threshold = ${threshold}, quantity = 0`;
    connection.query(q1, (err, results) => {
        if (err) {console.error(err)}
        else {
            res.send('Good boy!')
        }
    })
})



module.exports = router;