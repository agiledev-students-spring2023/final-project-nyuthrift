const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    buyer: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    seller: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    listingName: {type: String, required: true},
    listingImage: {type: [String], required: true},
    listingID: {type: Schema.Types.ObjectId, required: true},
    offerPrice: { type: Number, required: true },
    listedPrice: {type: Number, required: true},
    createdAt: { type: Date, default: Date.now }
});



const Offer = mongoose.model('offer', offerSchema);
module.exports = Offer; 