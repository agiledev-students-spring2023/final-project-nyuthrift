const User = require('../models/user.js')
const {Router} = require('express');
const jwt = require('jsonwebtoken');

const router = Router();

const maxAge = 3 * 24 * 60 * 60; 

const handleErrors = (err) => {
    let errors = {message : ''};

    if(err.message === 'incorrect password') {
        errors.message = 'The password was incorrect';
    } 

    if(err.message === 'incorrect username') {
        errors.message = 'The username was incorrect';
    } 

    return errors;
}



const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_STRING, {
        expiresIn: maxAge
    });
}



router.post('/signup', async (req, res) => {
    const { username, password } = req.body; 
    
    try {
        const user = await User.create({username, password});
        //const token = createToken(user._id);
        //res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        //res.status(201).json({user: user._id});
    }
    catch (err) {
        if(err.code === 11000) {
            res.status(400).json({Message: 'Username already exists!'});
          }
        console.log(err);
    }   


});


router.post('/signin', async (req, res) => {
    const { username, password } = req.body; 

    try {
        const user = await User.login(username, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({user: user._id});
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
});

router.get('/logout', async (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.status(200).end();


});


module.exports = router; 