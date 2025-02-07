const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    // category_id : { type: mongoose.Schema.Types.ObjectId, required: true},
    category_name: { type: String, required: true },
    description: String,
    category_img: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports.Category = mongoose.model('Category', CategorySchema) 
