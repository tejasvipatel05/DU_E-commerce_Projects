const express = require('express')
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db');

// const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/UserRoutes');
const cartRoutes = require('./routes/CartRoutes');
const categoryRoutes = require('./routes/CategoryRoutes');
const couponRoutes = require('./routes/CouponRoutes');
const discountRoutes = require('./routes/DiscountRoutes');
const reviewRoutes = require('./routes/ReviewRoutes');
const paymentRoutes = require('./routes/PaymentRoutes');
const productRoutes = require('./routes/ProductRoutes');
const orderRoutes = require('./routes/OrderRoutes');
const returnRoutes = require('./routes/ReturnRoutes');
const wishlistRoutes = require('./routes/WishlistRoutes');

const app = express();
app.use(bodyParser.json());

connectDB();
    
// app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/user',userRoutes);
app.use('/cart',cartRoutes);
app.use('/category',categoryRoutes);
app.use('/coupon',couponRoutes);
app.use('/discount',discountRoutes);
app.use('/review',reviewRoutes);
app.use('/payment',paymentRoutes);
app.use('/product',productRoutes);
app.use('/order',orderRoutes);
app.use('/return',returnRoutes);
app.use('/wishlist',wishlistRoutes);

app.listen(process.env.PORT,(req, res)=>{
    console.log("Server Started @ "+process.env.PORT+" port");
});