const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    // coupon_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    code: { type: String, required: true, unique: true },
    discount_type: { type: String, enum: ['Percentage', 'FlatOff'], required: true },
    value: { type: Number, required: true },
    expiration_date: { type: Date, required: true },
    is_active: { type: Boolean, default: true },
    minimum_purchase: { type: Number, default: 0 },
    max_usage: { type: Number, default: 1 },
    used_count: { type: Number, default: 0 }
}, { timestamps: true });

module.exports.Coupon = mongoose.model('Coupon', CouponSchema);
