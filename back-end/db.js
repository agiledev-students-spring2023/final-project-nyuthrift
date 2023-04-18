import mongoose from "mongoose";
const { Schema } = mongoose; 
import fs from 'fs';
import path from 'path';
import url from 'url';



const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String },
  bio: { type: String },
  avatar: { type: String },

});

const offerSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
    photos: [{ type: String }],
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    offers: [offerSchema]
  });


const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});


const conversationSchema = new Schema({
    users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
});








//model:
const Message = mongoose.model('Message', messageSchema);
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Conversation = mongoose.model('Conversation', conversationSchema);
const Offer = mongoose.model('Offer', offerSchema);