const User = require('../models/user.js');
const Conversation = require('../models/conversation');
const Message = require('../models/messages.js');
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const router = Router();

//get user:
// routes.js or any other file where you have defined your routes

router.get('/api/current-user', async (req, res) => {
    try {
      const token = req.cookies.jwt;
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const decodedToken = jwt.verify(token, process.env.SECRET_STRING);
      const userId = decodedToken.id;
  
      // Assuming you have a User model
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ id: user._id, username: user.username });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user information' });
    }
  });
  

//create new conversation
router.post('/api/new_conversation', async (req, res) => {
    try {
        const token = req.cookies.jwt;
        const decodedToken = jwt.verify(token, process.env.SECRET_STRING);
        const userId1 = decodedToken.id;

        const { userId } = req.body;
        console.log(userId)
        // Check if a conversation already exists between the two users
        const existingConversation = await Conversation.findOne({
            users: { $all: [userId1, userId] },
        });

        // If a conversation already exists, return it
        if (existingConversation) {
            res.status(200).json(existingConversation);
            return;
        }

        // Otherwise, create a new conversation
        const newConversation = await Conversation.create({ users: [userId1, userId] });
        res.status(201).json(newConversation);
    } catch (error) {
        console.error('Error creating conversation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//get all conversations for the logged-in use
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


//get a specific conversation by ID
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


//add message to existing convo
router.get('/api/messages/:conversationId', async (req, res) => {
    try {
        const { conversationId } = req.params;
  
        const conversation = await Conversation.findById(conversationId)
            .populate('users')
            .populate('messages');

        
        await conversation.save();

        res.status(200).json(conversation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/api/messages/:conversationId', async (req, res) => {
    console.log('Received message:', req.body);
    try {
      const { conversationId } = req.params;
      const { content, user_id } = req.body;
      console.log('Curr User: ', user_id);
      const conversation = await Conversation.findById(conversationId);
      const recipient = conversation.users.find((x) => x._id !== user_id);
      const currentUser = await User.findOne({_id: user_id})
      const header = currentUser.username + ": "
      const full = header + content
      // Create a new message
      
      const newMessage = await Message.create({
        sender: user_id,
        recipient: recipient,   
        content: full
      });

      // Add the new message to the conversation
      
      conversation.messages.push(newMessage._id);
      await conversation.save();
      console.log(newMessage)
      res.status(201).json(newMessage);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  


module.exports = router;