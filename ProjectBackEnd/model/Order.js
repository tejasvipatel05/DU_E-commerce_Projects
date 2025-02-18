const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    // order_id: { type: mongoose.Schema.Types.ObjectId, required: true},
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order_items: [{
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        quantity: { type: Number, required: true },
        price_at_purchase: { type: Number, required: true },
        order_status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' }
    }],
    orderDate: {type: Date, default: Date.now() },
    deliverydate: {type: Date},
    total_amount: { type: Number, required: true },
    shipping_address: String,
}, { timestamps: true });

module.exports.Order = mongoose.model('Order', OrderSchema);