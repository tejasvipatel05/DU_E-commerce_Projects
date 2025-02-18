const mongoose = require('mongoose');

const ReturnSchema = new mongoose.Schema({
    // return_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    return_status: { 
        type: String, 
        enum: ["Pending", "Approved", "Rejected", "Processing", "Completed"], 
        default: "Pending" 
    },
    return_reason: { type: String, required: true },
    return_date: { type: Date, default: Date.now },
    processed_date: { type: Date }
}, { timestamps: true });

module.exports.Return = mongoose.model('Return', ReturnSchema);