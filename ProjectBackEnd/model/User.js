const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // user_id : mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true,},
    full_name: {type: String, required: true,},
    nick_name: {type: String, default: null},
    profile_picture: {type: String},
    phone_number: {type: String, required: true, unique: true},
    address: {type: String},
    role: { type: String, enum: ['customer','admin','seller'], default:'customer'},
    seller_details: {
        store_name: {type: String},
        business_email: {type: String},
        gst_number: {type: String},
        bank_account: {type: String},
    },
    isActive: {type: Boolean, default: true},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    cart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', default: null},
    wishlist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist', default: null},
});

module.exports.User = mongoose.model('User', UserSchema) 