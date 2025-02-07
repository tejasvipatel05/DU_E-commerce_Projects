const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    // product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product_name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    stock_quantity: { type: Number, required: true },
    product_img: [String],
    brand: String,
    ingredients: String,
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});


module.exports.Product = mongoose.model('Product', ProductSchema) 