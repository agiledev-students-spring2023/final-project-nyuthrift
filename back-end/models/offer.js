const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});



const Offer = mongoose.model('Offer', offerSchema);
module.exports = Listing; 