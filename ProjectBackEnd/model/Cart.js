const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    products: [{
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        seller_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        quantity: { type: Number, required: true }
    }],
    totalQuantity: { type: Number, default: 0 },
    appliedCoupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon', default: null }
}, { timestamps: true });

CartSchema.pre('save', function(next) {
    this.totalQuantity = this.products.reduce((acc, item) => acc + item.quantity, 0);
    next();
});

module.exports.Cart = mongoose.model('Cart', CartSchema) 
