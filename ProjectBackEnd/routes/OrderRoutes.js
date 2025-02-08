const express = require('express');

const {Order} = require('../model/Order');
const {User} = require('../model/User');
const {Cart} = require('../model/Cart')
const router = express.Router();

//GET all orders
router.get('/',async(req, res) => {
    const data = await Order.find();
    res.send(data);
})

//GET Order by id
router.get('/:id', async (req, res) => {
    const data = await Order.findById(req.params.id);
    res.send(data);
})

//POST Order
router.post('/', async (req, res) => {
    const data = await Order.create(req.body);
    res.send(data);
})

//PATCH Order
router.patch('/:id', async (req, res) => {
    const data = await Order.findByIdAndUpdate(req.params.id, req.body);
    res.send(data);
})

//DELETE Order
router.delete('/:id', async (req, res) => {
    const data = await Order.findByIdAndDelete(req.params.id);
    res.send(data);
})

module.exports = router;