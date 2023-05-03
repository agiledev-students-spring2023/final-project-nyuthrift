const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String, 
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['Clothing', 'Textbooks', 'Appliances', 'Furniture', 'Electronics', 'Misc'],
        required: true
    },
    condition: {
        type: String,
        enum: ['New', 'Barely Used', 'Used', 'Fair', 'Poor'],
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }
})

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing; 