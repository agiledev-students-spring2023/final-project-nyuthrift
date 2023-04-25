const Offer = require('../models/offer.js');
const { Router } = require('express');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const Listing = require('../models/listing.js');
const router = Router();

router.post('/api/create-offers', async(req, res) => {
    const seller = req.body.seller; 
    const offerPrice = req.body.offerPrice;
    const listedPrice = req.body.listedPrice;
    const listingID = req.body.id;
    const listingImage = req.body.listingImage;
    const listingName = req.body.listingName; 
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.SECRET_STRING); 
    const userId = decoded.id; 
    const user = await User.findOne({ _id: userId });

    if(!user){
        console.log('User not found:', userId);
        return res.status(404).send('User not found')
    }

    const newOffer = new Offer({
        buyer: {
          id: user._id,
          name: user.username  
        },
        seller: {
            id: seller.id,
            name: seller.name  
          },
        listingName,
        listingImage,
        listingID,
        offerPrice, 
        listedPrice
    });

    try{
        await newOffer.save();
        res.json({ success: true, message: 'Offer created successfully' });
    } catch(err){
        console.log(err);
        res.status(500).send('Internal server error')
    }
});

router.get('/api/myoffers', async (req, res) => {
    const decodedToken = jwt.verify(req.cookies.jwt, process.env.SECRET_STRING);
    try{
        const offers = await Offer.find({ 'seller.id' : decodedToken.id })
        res.json(offers);
    } catch(error){
        console.error(error);
        res.status(500).send('Server error')
    }
});


router.post('/api/delete-offers', async(req, res) => {
    const offerId = req.body.id; 
    try{
        await Offer.findByIdAndDelete(offerId);
        res.status(200).json({ message: 'Offer deleted' })
    } catch(error){
        console.log("Error deleting listing")
    }


});




module.exports = router;