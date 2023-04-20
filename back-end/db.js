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
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  likedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
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
    offers: [offerSchema],
    status: { type: String, required: true },
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

const sellerReviewSchema = new Schema({
  reviewer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const productReviewSchema = new Schema({
  reviewer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const orderSchema = new Schema({
  buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['placed', 'completed', 'canceled'], required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});








//model:
const Message = mongoose.model('Message', messageSchema);
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Conversation = mongoose.model('Conversation', conversationSchema);
const Offer = mongoose.model('Offer', offerSchema);
const SellerReview = mongoose.model('SellerReview', sellerReviewSchema);
const ProductReview = mongoose.model('ProductReview', productReviewSchema);
const Order = mongoose.model('Order', orderSchema);