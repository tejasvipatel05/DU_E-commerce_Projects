const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const userRoute = require('./routes/UserRoutes');

const { Product } = require('./model/Product');
const { Cart } = require('./model/Cart');
const { Category } = require('./model/Category');
const { User } = require('./model/User');

mongoose.connect(process.env.dbUrl).then(()=>{
    console.log("DB Connected")
    const app = express()

    app.use('/users',userRoute);

    // app.get('/all-products', async(req, res)=>{
    //     const products = await Product.find()
    //     .populate({
    //         path: 'category_id',
    //         // select: ['category_name','description']
    //     })
    //     res.send(products)
    // })

    // app.get('/order', async(req, res)=>{
    //     const { user_id } = {user_id : '67a221f97702c8f980977733'}
        // const cart =  await Cart.findOne({user_id})
        // res.send(cart)
        
        
        // const user = await User.findOne({ user_id })
        // .populate('cart_id')
        // .exec()
    //     console.log(user);
        
    //     const cart = await Cart.findOne(user.cart_id)
    //     .populate('products.product_id')

        
    //     res.send(cart);
    // })


    app.listen(process.env.PORT,(req, res)=>{
        console.log("Server Started @ "+process.env.PORT+" port");
        
    })
})
.catch((err)=>{
    console.log(err);
})