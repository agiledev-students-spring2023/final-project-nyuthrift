const Listing = require('../models/listing.js')
const User = require('../models/user.js')
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

router.post('/api/sell', upload.array('images'), async (req, res) => {

    const { title, price, description, condition, category } = req.body
    const images = req.files.map((file) => file.filename);

    console.log("Images:", images);
    const token = req.cookies.jwt; 
    if(!token) {
        return res.status(401).send('Missing token')
    }

    let decodedToken; 
    try {
        decodedToken = jwt.verify(token, process.env.SECRET_STRING)
        console.log('decodedToken:', decodedToken);
    } catch(err) {
        console.log(err.message);
        return res.status(401).send('Invalid token')
    }

    //get username
    //const username = decodedToken.username; 
    //console.log(username);

    const userID = decodedToken.id; 
    console.log('User id:', userID); 


    //const user = await User.findOne( { username: username });

    const user = await User.findById(userID);
    console.log('Username:', user.username);

    if(!user){
        console.log('User not found:', userID);
        return res.status(404).send('User not found')
    }

    

    const newListing = new Listing({
        title, 
        description, 
        price,
        category,
        condition,
        images,
        user: {
          id: user._id,
          name: user.username  
        },
    });

    try{
        await newListing.save();
        res.json({ id: newListing._id, message: 'Listing created successfully' });
    } catch(err){
        console.log(err);
        res.status(500).send('Internal server error')
    }
});

router.get('/api/products/:id', async (req, res) => {
    const listingId = req.params.id; 

    try{
        const listing = await Listing.findById(listingId);
        if (listing) {
            res.json(listing)
        }
        else{
            res.status(404).send('Listing not found')
        }
    } catch(err){
        console.error(err);
        res.status(500).send('Internal server error');
    }

})

router.get('/api/mylistings', async (req, res) =>{
    const decodedToken = jwt.verify(req.cookies.jwt, process.env.SECRET_STRING);
    try{
        const listings = await Listing.find({ 'user.id' : decodedToken.id })
        res.json(listings);
    } catch(error){
        console.error(error);
        res.status(500).send('Server error')
    }
})

router.get('/api/allproducts', async (req, res) => {
  try {
    const listings = await Listing.find({});
    res.json(listings);
  } catch(error){
    console.error('Error fetching listings:', error);
  }
})

router.delete('/api/delete/:id', async(req, res) => {
    const listingId = req.params.id; 
    try{
        await Listing.findByIdAndDelete(listingId);
        res.status(200).json({ message: 'Listing deleted' })
    } catch(error){
        console.log("Error deleting listing")
    }
})

module.exports = router; 