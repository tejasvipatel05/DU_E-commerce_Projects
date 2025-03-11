const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    // category_id : { type: mongoose.Schema.Types.ObjectId, required: true},
    category_name: { type: String, required: true },
    description: String,
    category_img: String,
}, { timestamps: true });

module.exports.Category = mongoose.model('Category', CategorySchema) 
