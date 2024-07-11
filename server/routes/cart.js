const express = require('express');
const app = express();
const router = express.Router();
const connection = require('../database');

router.use(express.json());


//Display in cart
router.get('/:id', (req, res) => {
    const {id: account_id} = req.params;
    let q = 'SELECT product.product_id, product.name, stock.price, batch_no, sale_item.quantity, sale.account_id FROM sale ' + 
            'INNER JOIN sale_item USING (sale_id) ' +
            'INNER JOIN product USING (product_id) ' +
            'INNER JOIN stock USING (product_id) ' +
            `WHERE sale.account_id = ? AND sale.sale_status = 'cart' ` +
            'AND batch_no = (SELECT MAX(batch_no) AS batch_no FROM stock WHERE quantity > 0 AND product_id = product.product_id)';

    connection.query(q, [account_id], function(err, results) {
        if (err) {
            console.log(err.message);
        }
        // console.log(results);

        res.json(results);
    });
});

//Update quantity when incremented or decremented in cart
router.post('/:id', (req, res) => {
    const {id: account_id} = req.params;
    const {product_id, quantity} = req.body;
    
    console.log('Updating database for cart quantity...')
    console.log(req.body)
    
    const q1 = `UPDATE sale_item INNER JOIN sale USING (sale_id) SET quantity = ? ` +
                `WHERE account_id = ? ` +
                `AND sale_status = 'cart' ` +
                `AND product_id = ?`;
    connection.query(q1, [quantity, account_id, product_id], (err, results) => {
        if (err) {
            console.error(err)
            res.json({error: err.message});
        }
    })

    //Check if the sale_item associated with the product_id has a quantity of 0
    const q2 = `SELECT quantity FROM sale_item INNER JOIN sale USING (sale_id) ` + 
                `WHERE account_id = ? AND sale_status = 'cart' AND product_id = ?`;
    connection.query(q2, [account_id, product_id], (err, results) => {
        if (err) {
            console.error(err)
            res.json({error: err.message})
        }
        else {
            const {quantity} = results[0];
            
            // If quantity = 0, we remove the sale_item
            if (quantity === 0) {
                const q3 = 'DELETE sale_item FROM sale_item INNER JOIN sale USING (sale_id)' +
                ` WHERE account_id = ? AND product_id = ?`;
                connection.query(q3, [account_id, product_id], (err, results) => {
                    if (err) {
                        console.error(err)
                        res.json({error: err.message})
                    }
                })
            }
        }
    })

    res.json( {message: "Cart quantity successfully updated"} )
    // res.redirect('/cart')

})

module.exports = router;