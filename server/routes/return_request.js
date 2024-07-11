const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => { //destination is where the image will be uploaded to on your pc
        const destinationPath = path.resolve(__dirname, '../../src/imgs');
        cb(null, destinationPath); //null should be error handling
    },
    filename: (req, file, cb) => { //filename is the new Filename that will be used when its uploaded on your pc
        cb(null, Date.now() + path.extname(file.originalname)) //originalname is the original name of the image
    }
})
const upload = multer({ storage: storage })

router.use(express.json())

const connection = require('../database');


router.post('/:id', upload.single('img'), (req, res) => {
    const {id: sale_id} = req.params;
    const {img, reason} = req.body;
    const {filename: img_name} = req.file; 
    //the name is just numbers now, name is composed of: the date it was submitted + the original img name (it encodes the imgName to numbers??)

    const q1 = `INSERT INTO return_request(sale_id, comment) VALUES (?, ?)`;
    connection.query(q1, [sale_id, reason], (err, results) => {
        if (err) {
            console.error(err)
        }
        else {
            console.log('[ReturnRequest] Query 1: OK')
        }
    })

    const q2 = `INSERT INTO return_request_img SET return_request_id = (SELECT return_request_id FROM return_request WHERE sale_id = ? LIMIT 1), ` +
                `img_url = ?`
    connection.query(q2, [sale_id, img_name], (err, results) => {
        if (err) {
            console.error(err)
        }
        else {
            console.log('[ReturnRequest] Query 2: OK')
        }
    })

    const q3 = `UPDATE sale SET sale_status = 'processing return' WHERE sale_id = ?`;
    connection.query(q3, [sale_id], (err, results) => {
        if (err) {
            console.error(err)
        }
        else {
            console.log('[ReturnRequest] Query 3: OK')
        }
    })

    res.json({message: 'Goods'})
})

module.exports = router;