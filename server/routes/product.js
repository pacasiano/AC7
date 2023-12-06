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


//Retrieve all categories
router.get('/categories/all', (req, res) => {
    const q = 'SELECT category FROM product ' +
                'GROUP BY category';
    connection.query(q, (err, results) => {
        if (err) console.error(err)
        else {
            res.json(results)
        }
    })
})

//Retrieve a particular product's data (To display in pages/product.js)
router.get('/:id', (req, res) => {
    const {id: product_id} = req.params;
    let returnResult = {};
    let finalReturnResult = {};
    const q = `SELECT product.*, SUM(quantity) AS quantity FROM product INNER JOIN stock USING (product_id) WHERE product_id = ${product_id}`;
    connection.query(q, (err, results) => {
        if (err) {
            console.error(err)
        }
        else {
            returnResult = {...results[0]}
        }
    })

    // Query 2: Get the price of the latest stock
    const q2 = `SELECT price FROM stock ` +
                `WHERE product_id = ${product_id} ` +
                `ORDER BY batch_no DESC ` +
                `LIMIT 1`;
    connection.query(q2, (err, results) => {
        if (err) console.error(err)
        else {
            finalReturnResult = {...results[0], ...returnResult}
            res.json(finalReturnResult)
        }
    })
})

//Add new product
router.post('/', (req, res) => {
    const {product_name, description, category, threshold} = req.body;
    console.log('Adding new product...')
    console.log(req.body)
    const q1 = `INSERT INTO product SET name = '${product_name}', description = '${description}', ` +
                `category = '${category}', threshold = ${threshold}`;
    connection.query(q1, (err, results) => {
        if (err) {console.error(err)}
        else {
            res.redirect('/AC7')
        }
    })
})



module.exports = router;