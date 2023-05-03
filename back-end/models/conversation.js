
const User = require('./user.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
});

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;
