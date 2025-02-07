const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // user_id : mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    first_name: String,
    last_name: String,
    phone_number: String,
    address: String,
    role: { type: String, enum: ['customer','admin','seller'], default:'customer'},
    seller_details: {
        store_name: String,
        gst_number: String,
        bank_account: String
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    cart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
    wishlist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist', required: true },
    
});

module.exports.User = mongoose.model('User', UserSchema) 