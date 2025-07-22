const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    // order_id: { type: mongoose.Schema.Types.ObjectId, required: true},
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    order_items: [{
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        quantity: { type: Number, required: true },
        price_at_purchase: { type: Number},
        order_status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' }
    }],
    orderDate: {type: Date, default: Date.now() },
    total_amount: { type: Number, required: true },
    shippingDetails: {
        address: {type: String},
        city: {type: String},
        postalCode: {type: Number}
    },
}, { timestamps: true });

module.exports.Order = mongoose.model('Order', OrderSchema);