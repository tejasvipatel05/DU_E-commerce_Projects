const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
    // wishlist_id: { type: mongoose.Schema.Types.ObjectId, required: true},
    products: [{ 
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        }]
}, { timestamps: true });

module.exports.Wishlist = mongoose.model('Wishlist', WishlistSchema) 
