const express = require('express');

const { Cart } = require('../model/Cart');
const { User } = require('../model/User')
const router = express.Router();


//GET all carts
router.get('/',async(req, res) => {
    const data = await Cart.find();
    res.send(data);
})

//PATCH Cart
router.patch('/:id', async (req, res) => {
    const data = await Cart.findByIdAndUpdate(req.params.id, req.body);
    res.send(data);
})

//DELETE Cart
router.delete('/:id', async (req, res) => {
    const data = await Cart.findByIdAndDelete(req.params.id);
    res.send(data);
})

//GET product from user's cart
router.get('/order', async(req, res)=>{
    const { user_id } = {user_id : '67a65d46a89626213a5009ba'}
    // const cart =  await Cart.findOne({user_id})
    // res.send(cart)
    
    const user = await User.findOne({ _id: user_id })
    // .populate('cart_id')
    
    const cart = await Cart.findOne({_id: user.cart_id})
    // .populate('products.product_id')
    res.send(cart);
})

//GET Cart by id
router.get('/:id', async (req, res) => {
    const data = await Cart.findById(req.params.id);
    res.send(data);
})

module.exports = router;
