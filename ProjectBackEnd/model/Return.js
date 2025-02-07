const mongoose = require('mongoose');

const ReturnSchema = new mongoose.Schema({
    // return_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        reason: { type: String, required: true }
    }],
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Completed'], default: 'Pending' },
    created_at: { type: Date, default: Date.now }
});

module.exports.Return = mongoose.model('Return', ReturnSchema);