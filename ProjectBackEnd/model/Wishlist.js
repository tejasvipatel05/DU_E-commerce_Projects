const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
    // wishlist_id: { type: mongoose.Schema.Types.ObjectId, required: true},
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports.Wishlist = mongoose.model('Wishlist', WishlistSchema) 
