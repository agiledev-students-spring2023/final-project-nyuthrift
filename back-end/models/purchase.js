const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
    productImage: { type: String },
    productName: { type: String },
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sellerName: { type: String, required: true },
    price: { type: Number, required: true },
    purchaseTime: { type: Date, default: Date.now },
  });

const Purchase = mongoose.model('Purchase', purchaseSchema);
module.exports = Purchase; 