const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_id : mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    first_name: String,
    last_name: String,
    phone_number: String,
    address: String,
    role: { type: String, enum: ['customer','admin'], default:'customer'},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    cart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
    wishlist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Wishlist', required: true },
});

const CategorySchema = new mongoose.Schema({
    category_id : { type: mongoose.Schema.Types.ObjectId, required: true},
    category_name: { type: String, required: true },
    description: String,
    category_img: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const ProductSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    product_name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    stock_quantity: { type: Number, required: true },
    product_img: [String],
    brand: String,
    ingredients: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const CartSchema = new mongoose.Schema({
    cart_id: { type: mongoose.Schema.Types.ObjectId, required: true},
    products: [{
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
    }],
    created_at: { type: Date, default: Date.now }
});

const DiscountSchema = new mongoose.Schema({
    discount_id: { type: mongoose.Schema.Types.ObjectId, required: true},
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    // code: { type: String, required: true, unique: true },
    discount_type: { type: String, enum: ['Percentage','FlatOff'], required: true},
    value: { type: Number, required: true },
    expiration_date: { type: Date, required: true },
    is_active: { type: Boolean, default: true }
});

const PaymentSchema = new mongoose.Schema({
    payment_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    payment_method: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    amount: Number,
    transaction_id: String,
    created_at: { type: Date, default: Date.now }
});

const OrderSchema = new mongoose.Schema({
    order_id: { type: mongoose.Schema.Types.ObjectId, required: true},
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    order_items: [{
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price_at_purchase: { type: Number, required: true }
    }],
    total_amount: { type: Number, required: true },
    order_status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    shipping_address: String,
    coupon_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const CouponSchema = new mongoose.Schema({
    coupon_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    code: { type: String, required: true, unique: true },
    discount_type: { type: String, enum: ['Percentage', 'FlatOff'], required: true },
    value: { type: Number, required: true },
    expiration_date: { type: Date, required: true },
    is_active: { type: Boolean, default: true }
});

const ReturnSchema = new mongoose.Schema({
    return_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        reason: { type: String, required: true }
    }],
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Completed'], default: 'Pending' },
    created_at: { type: Date, default: Date.now }
});

const ReviewSchema = new mongoose.Schema({
    review_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
    created_at: { type: Date, default: Date.now }
});

const WishlistSchema = new mongoose.Schema({
    wishlist_id: { type: mongoose.Schema.Types.ObjectId, required: true},
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = {
    User: mongoose.model('User', UserSchema),
    Category: mongoose.model('Category', CategorySchema),
    Product: mongoose.model('Product', ProductSchema),
    Cart: mongoose.model('Cart', CartSchema),
    Discount: mongoose.model('Discount', DiscountSchema),
    Payment: mongoose.model('Payment', PaymentSchema),
    Order: mongoose.model('Order', OrderSchema),
    Coupon: mongoose.model('Coupon',CouponSchema),
    Return: mongoose.model('Return',ReturnSchema),
    Review: mongoose.model('Review', ReviewSchema),
    Wishlist: mongoose.model('Wishlist', WishlistSchema)
};

