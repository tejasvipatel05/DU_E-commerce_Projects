const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    // _id: { type: mongoose.Schema.Types.ObjectId},
    products: [{
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        quantity: { type: Number, required: true }
        // _id: { type: mongoose.Schema.Types.ObjectId}
    }],
    created_at: { type: Date, default: Date.now }
});

module.exports.Cart = mongoose.model('Cart', CartSchema) 
