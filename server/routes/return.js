const express = require('express')

const router = express.Router();

router.use(express.json());

const connection = require('../database');


//Changes the action of the returned_sale -- wait, we dont have a returned sale table yet, only return request
router.post('/:id', (req, res) => {

    //action is either : refund, refundReturn, or reject
    const {action, account_id, refundAmount = 0, comment} = req.body;
    const {id: sale_id} = req.params;

    //Query 1: Create a returned_sale table
    const q1 = 'INSERT INTO returned_sale SET ' +
            'return_request_id = (SELECT return_request_id FROM return_request INNER JOIN sale USING (sale_id) WHERE sale_id = ? LIMIT 1), ' +
            'employee_id = (SELECT employee_id FROM employee WHERE account_id = ?), ' +
            'comment = ?, action = ?, refund_amount = ?';
    connection.query(q1, [sale_id, account_id, comment, action, refundAmount], (err, results) => {
        if (err) console.error(err)
        else {
            console.log('[Return] Query 1: OK')
        }
    })

    //Query 2: Update sale status to 'returned'
    const q2 = 'UPDATE sale SET sale_status = \'returned\' WHERE sale_id = ?';
    connection.query(q2, [sale_id], (req, res) => {
        if (err) console.error(err)
        else {
            console.log('[Return] Query 2: OK')
        }
    })

    //Query 3: Issue a voucher if action is either refund || return + refund
    if (action !== "reject") {
        const q3 = 'INSERT INTO voucher SET amount = ?, code = \'PASADOSASOFTENG\'';
        connection.query(q3, [refundAmount], () => {
            if (err) console.error(err)
            else {
                console.log('[Return] Query 3: OK')
            }
        })
    }

    res.json({message: 'Goods'})
})

module.exports = router;