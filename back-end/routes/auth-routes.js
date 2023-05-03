const User = require('../models/user.js');
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = Router();
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_STRING, {
    expiresIn: maxAge,
  });
};



router.post('/signup', async (req, res) => {
    const { username, password} = req.body;
  
    try {
      const user = await User.create({ username, password });
      res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ success: false, message: 'Username already exists' });
      } else {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    }
  });


  // In your routes or controllers file

  


router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ success: false, message: 'Incorrect username or password' });
      return;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(401).json({ success: false, message: 'Incorrect username or password' });
      return;
    }

    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ success: true, message: 'Logged in successfully', token: token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/api/logout', async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;
