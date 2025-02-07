const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    // coupon_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    code: { type: String, required: true, unique: true },
    discount_type: { type: String, enum: ['Percentage', 'FlatOff'], required: true },
    value: { type: Number, required: true },
    expiration_date: { type: Date, required: true },
    is_active: { type: Boolean, default: true }
});

module.exports.Coupon = mongoose.model('Coupon', CouponSchema);
