const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // user_id : mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    first_name: {type: String},
    last_name: {type: String},
    phone_number: {type: String},
    address: {type: String},
    role: { type: String, enum: ['customer','admin','seller'], default:'customer'},
    seller_details: {
        store_name: {type: String},
        gst_number: {type: String},
        bank_account: {type: String},
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    cart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    wishlist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist'},
});

module.exports.User = mongoose.model('User', UserSchema) 