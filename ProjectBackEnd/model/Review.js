const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    // review_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
    created_at: { type: Date, default: Date.now }
});

module.exports.Review = mongoose.model('Review', ReviewSchema)
