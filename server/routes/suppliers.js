const express = require('express');
const app = express();
const router = express.Router();

const connection = require('../database');

router.get('/', (req, res) => {
    const q = 'SELECT name FROM supplier';
    connection.query(q, (err, results) => {
        res.json(results)
    })
})

router.get('/all', (req, res) => {
    const q = `SELECT * FROM supplier`;
    connection.query(q, (err, results) => {
        res.json(results)
    })
})

module.exports = router;