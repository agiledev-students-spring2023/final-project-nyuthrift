const User = require('../models/user.js');
const Conversation = require('../models/conversation');
const Message = require('../models/messages.js');
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const router = Router();



//create new conversation
router.post('/api/new_conversation', async (req, res) => {
    try {
        console.log(req.body)
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
        const token = req.cookies.jwt;
        const decodedToken = jwt.verify(token, process.env.SECRET_STRING);
        const userId = decodedToken.id;

        // Filter messages based on the logged-in user and the conversation ID
        const messages = await Message.find({
            $and: [
                { $or: [{ sender: userId }, { recipient: userId }] },
                { conversationId },
            ],
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

        // Get the conversation for the specified conversation ID and add the messages to it
        const conversation = await Conversation.findById(conversationId)
            .populate('users')
            .populate('messages');

        conversation.messages = messages;
        await conversation.save();

        res.status(200).json(conversation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});




module.exports = router;