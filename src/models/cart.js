const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to your user model
    cartItems: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, default: 1 },
            price: { type: Number },
            image: { type: String },
            name: { type: String },
            description: { type: String }
        },
    ],
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);


