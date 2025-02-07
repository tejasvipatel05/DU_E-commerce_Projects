const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    // payment_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    payment_method: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    amount: Number,
    transaction_id: String,
    created_at: { type: Date, default: Date.now }
});

module.exports.Payment = mongoose.model('Payment', PaymentSchema)