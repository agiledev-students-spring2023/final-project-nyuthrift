const Listing = require('../models/listing.js')
const User = require('../models/user.js')
const Purchase = require('../models/purchase.js')
const jwt = require('jsonwebtoken');
const multer = require("multer") // middleware to handle HTTP POST requests with file uploads
const express = require('express');
const router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });

router.get('/api/mypurchases', async (req, res) =>{
    const decodedToken = jwt.verify(req.cookies.jwt, process.env.SECRET_STRING);
    try{
        const purchases = await Purchase.find({ 'buyer' : decodedToken.id })
        res.json(purchases);
    } catch(error){
        console.error(error);
        res.status(500).send('Server error')
    }
})

module.exports = router; 