const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    // cart_id: { type: mongoose.Schema.Types.ObjectId, required: true},
    products: [{
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
    }],
    created_at: { type: Date, default: Date.now }
});

module.exports.Cart = mongoose.model('Cart', CartSchema) 
