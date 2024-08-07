const { faArrowCircleUp } = require('@fortawesome/free-solid-svg-icons');
const express = require('express');
const app = express();
const router = express.Router();

//app.use baited me so hard causing req.body to be empty. It took 6 fucking hrs to debug. All it took was to change app.use to router.use 🤦‍♂️
router.use(express.json())

const connection = require('../database');


router.post('/', (req, res) => {
    console.log('CHECK ME TF OUT')
    console.log(req.body)
    const {account_id, items_purchased, payment_method, address_name, gcash_ref_num, amount} = req.body;
    //need to validate gcash_ref_num length doesn't exceed 13 and only contains numbers

    //Query 1: Create a sale_payment entry
    async function queryOne() {
        const q1 = `INSERT INTO sale_payment SET sale_id = (SELECT sale_id FROM sale WHERE account_id = ? AND sale_status = 'cart'), ` +
                    `mode_of_payment = ?, amount = ?`;

        return new Promise((resolve, reject) => {
            connection.query(q1, [account_id, payment_method, amount], (err, results) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                else {
                    console.log("[Checkout] Query 1: Goods")
                    resolve(results)
                }
            })
        })
    }

    //Query 1.2: Add the selected address_id during checkout to the sale
    async function queryOneTwo() {
        const setAddressIdQuery = `UPDATE sale SET address_id = ` +
                        `(SELECT address_id FROM address WHERE customer_id = ` + 
                                `(SELECT customer_id FROM customer WHERE account_id = ?) AND name = ?) ` +
                        `WHERE sale_status = 'cart' AND account_id = ?`;
        return new Promise((resolve, reject) => {
            connection.query(setAddressIdQuery, [account_id, address_name, account_id], (err, results) => {
                if (err) reject(err)
                else {
                    console.log('[Checkout] Query 1.2 Goods')
                    resolve(results)
                }
            })
        })
    }

    //Query 2: Store Gcash reference number
    async function queryTwo() {
        const q2 = `INSERT INTO gcash_payment SET ` +
                    `reference_num = ?, ` +
                    `sale_payment_id = (SELECT sale_payment_id FROM sale_payment INNER JOIN sale USING (sale_id) ` +
                                        `WHERE account_id = ? AND sale_status = 'cart')`; 

        return new Promise((resolve, reject) => {
            connection.query(q2, [gcash_ref_num, account_id], (err, results) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                else {
                    console.log("[Checkout] Query 2: Goods")
                    resolve(results)
                }
            })
        })
    }
    

    //i want to record the number of items per product that was taken from a batch
    //cart product qty - current stock qty (if this is 0, we move to the next batch)

    //Query 3: Update the stock table - stock out the products that were bought in the checkout
    //And record sale_item_stock (how many items come from which batch)

    async function handleWhileLoop(cartItemQty, cartItemId) {
        while (cartItemQty > 0) {
            // console.log('INSIDE WHILE LOOP')
            // console.log('Cart Item Qty: ' + cartItemQty)
            cartItemQty = await queryThree(cartItemQty, cartItemId);
            // console.log('While loop: Cart Item QTY: ' + cartItemQty)
        }
    }

    async function queryThree(cartItemQty, cartItemId) {
        //Query 3: Get stock_id and quantity of the product with the least batch_no
        const q3 = `SELECT * FROM stock WHERE product_id = ? AND quantity > 0 ORDER BY batch_no LIMIT 1`;

        return new Promise(async (resolve, reject) => {
            connection.query(q3, [cartItemId], async (err, results) => {
                if (err) {
                    console.error(err.message)
                    reject(err)
                }
                else {
                    let {stock_id, quantity: currentBatchQty} = results[0];
                    console.log(results)
                    if (cartItemQty === currentBatchQty) {
                        //INSERT into sale_item_stock SET quantity = cartItemQty 
                        await queryFour(cartItemQty, stock_id, account_id, cartItemId)
    
                        //UPDATE the current batch's qty to 0
                        await queryFive(0, stock_id)
    
                        cartItemQty = 0; // To end loop
                    }
                    else if (cartItemQty > currentBatchQty) {
                        cartItemQty -= currentBatchQty;
    
                        //INSERT into sale_item_stock SET quantity = currentBatchQty
                        await queryFour(currentBatchQty, stock_id, account_id, cartItemId)
    
                        //UPDATE the current batch's qty to 0
                        await queryFive(0, stock_id)
                    }
                    else if (cartItemQty < currentBatchQty) {
                        currentBatchQty -= cartItemQty;
                        console.log('ELSE IF runs')
                        //INSERT into sale_item_stock SET quantity = cartItemQty
                        await queryFour(cartItemQty, stock_id, account_id, cartItemId)
    
                        //UPDATE stock SET quantity = currentBatchQty
                        await queryFive(currentBatchQty, stock_id)
    
                        cartItemQty = 0; // To end loop
                    }
    
                    console.log('[Checkout] Query 3: Goods ' + cartItemQty)
                    resolve(cartItemQty);
                }
            })
        })
    }

    async function queryFour(saleItemStockQty, stockId, accountId, cartItemId) {
        //INSERT into sale_item_stock SET quantity = cartItemQty 
        const q4 = `INSERT INTO sale_item_stock SET quantity = ?, stock_id = ?, ` +
                    'sale_item_id = (SELECT sale_item_id FROM sale_item INNER JOIN sale USING (sale_id) ' +
                    `WHERE account_id = ? AND sale_status = 'cart' AND product_id = ?)`;
        
        return new Promise((resolve, reject) => {
            connection.query(q4, [saleItemStockQty, stockId, accountId, cartItemId], (err, results) => {
                if (err) {
                    console.error(err.message)
                    reject(err)
                }
                else {
                    console.log('[Checkout] Query 4: Goods')
                    resolve(results)
                }
            });
        });
    }

    async function queryFive(qty, stockId) {
        const q5 = `UPDATE stock SET quantity = ? WHERE stock_id = ?`;

        return new Promise((resolve, reject) => {
            connection.query(q5, [qty, stockId], (err, results) => {
                if (err) {
                    console.error(err.message)
                    reject(err)
                }
                else {
                  console.log('[Checkout] Query 5: Goods')
                  resolve(results)
                }
            })
        })
    }


    async function manageStock() {
        let promises = [];
      
        items_purchased.forEach((item) => {
        //   console.log('INSIDE FOR EACH LOOP');
      
          let cartItemQty = item.quantity;
          const cartItemId = item.product_id;
      
        //   console.log('IIFE async function');
      
          promises.push(handleWhileLoop(cartItemQty, cartItemId));
        });
      
        await Promise.all(promises); //ensures all promises in the promises array have been fulfilled
        return 'fuckAsync'; //return a promise 
    }

    //Query 6: Update the sale_status of the current sale from 'cart' to 'processing order'
    async function querySix() {
        const q6 = `UPDATE sale SET sale_status = 'processing order' WHERE account_id = ? AND sale_status = 'cart'`;

        return new Promise((resolve, reject) => {
            connection.query(q6, [account_id], (err, results) => {
                if (err) { 
                    console.error(err) 
                    reject(err)
                }
                else {
                    console.log('[Checkout] Query 6: Goods')
                    resolve(results)
                }
            })
        })
    }

    //Query 7: Create a new sale entry for the account
    async function querySeven() {
        const q7 = `INSERT INTO sale(account_id) VALUES(?)`;

        return new Promise((resolve, reject) => {
            connection.query(q7, [account_id], (err, results) => {
                if (err) {
                    console.error(err)
                    reject(err)
                }
                else {
                    console.log('[Checkout] Query 7: Goods')
                    resolve(results)
                }
            })
        })
    }

    async function main() {
        await queryOne();
        await queryOneTwo();
        if (payment_method === 'gcash') await queryTwo();
        
        let doneMsg = await manageStock();


        if (doneMsg === 'fuckAsync') {
            // console.log('Inside fuck async: ' + doneMsg)
            await querySix();
            await querySeven();
        }

        res.json({
            message: 'Success'
        })
    }

    main()
    
})


module.exports = router;
