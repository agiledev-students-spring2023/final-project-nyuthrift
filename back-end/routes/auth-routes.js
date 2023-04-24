const User = require('../models/user.js');
const Conversation = require('../models/conversation');
const Message = require('../models/messages.js');
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

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
  
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
  router.get('/api/conversations', async (req, res) => {
    console.log("here"); 
    try {
      const token = req.cookies.jwt;
      const decodedToken = jwt.verify(token, process.env.SECRET_STRING);
      const userId = decodedToken.id;
      console.log("userId: ", userId); 
      const conversations = await Conversation.find({ users: userId })
        .populate('users')
        .populate({ path: 'messages', populate: { path: 'sender' } });
      console.log(conversations)
      res.status(200).json(conversations.length ? { conversations, userId } : { conversations: [], userId }); // include userId in the JSON response
    } catch (error) {
      console.error('Error fetching conversations:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.get('/api/conversations/:conversationId', async (req, res) => {
    try {
      const conversation = await Conversation.findById(req.params.conversationId)
        .populate('users')
        .populate({ path: 'messages', populate: { path: 'sender' } });
      res.status(200).json(conversation);
    } catch (error) {
      console.error('Error fetching conversation:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  

  
  router.get('/api/messages', async (req, res) => {
    try {
      // Get the user ID from the JWT
      const token = req.cookies.jwt;
      const decodedToken = jwt.verify(token, process.env.SECRET_STRING);
      const userId = decodedToken.id;
  
      // Filter messages based on the logged-in user
      let messages = await Message.find({
        $or: [{ sender: userId }, { recipient: userId }],
      })
        .populate('sender')
        .populate('recipient');
  
      // If no messages are found, return an array with a single message
      if (messages.length === 0) {
        messages = [
          {
            _id: 'no-messages',
            sender: { username: 'System' },
            content: 'No messages yet.',
          },
        ];
      }
      console.log(messages)
      res.status(200).json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  

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
    res.status(200).json({ success: true, message: 'Logged in successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/logout', async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;
