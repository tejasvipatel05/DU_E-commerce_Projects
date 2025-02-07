const mongoose = require('mongoose');

const DiscountSchema = new mongoose.Schema({
    // discount_id: { type: mongoose.Schema.Types.ObjectId, required: true},
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    // code: { type: String, required: true, unique: true },
    discount_type: { type: String, enum: ['Percentage','FlatOff'], required: true},
    value: { type: Number, required: true },
    expiration_date: { type: Date, required: true },
    is_active: { type: Boolean, default: true }
});

module.exports.Discount = mongoose.model('Discount', DiscountSchema) 
