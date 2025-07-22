const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    discount_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Discount'},
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: 'text' },
    product_name: { type: String, required: true, index: 'text' },
    description: String,
    price: { type: Number, required: true, min: [0, 'Price cannot be negative'] },
    stock_quantity: { type: Number, required: true, min: [0, 'Stock quantity cannot be negative'] },
    product_img: [String],
    brand: String,
    ingredients: String,
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });


module.exports.Product = mongoose.model('Product', ProductSchema) 