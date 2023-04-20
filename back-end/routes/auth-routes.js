const User = require('../models/user.js')
const {Router} = require('express');
const jwt = require('jsonwebtoken');

const router = Router();

const maxAge = 3 * 24 * 60 * 60; 
const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_STRING, {
        expiresIn: maxAge
    });
}



router.post('/signup', async (req, res) => {
    const { username, password } = req.body; 
    
    try {
        const user = await User.create({username, password});
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({user: user._id});
    }
    catch (err) {
        if(err.code === 11000) {
            res.status(400).json({Message: 'Username already exists!'});
          }
        console.log(err);
    }   


});


router.post('/signin', async (req, res) => {



});

router.get('/logout', async (req, res) => {



});


module.exports = router; 