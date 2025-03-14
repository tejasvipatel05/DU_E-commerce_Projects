const mongoose = require('mongoose');

const DiscountSchema = new mongoose.Schema({
    // discount_id: { type: mongoose.Schema.Types.ObjectId, required: true},
    // code: { type: String, required: true, unique: true },
    discount_type: { type: String, enum: ['Percentage','FlatOff'], required: true},
    value: { type: Number, required: true },
    expiration_date: { type: Date, required: true },
    is_active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports.Discount = mongoose.model('Discount', DiscountSchema) 
