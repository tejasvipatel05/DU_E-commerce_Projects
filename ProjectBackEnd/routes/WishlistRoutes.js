const express = require('express');

const {Wishlist} = require('../model/Wishlist');
const router = express.Router();

//GET all wishlist products
router.get('/',async(req, res) => {
    const data = await Wishlist.find();
    res.send(data);
})

//GET Wishlist by id
router.get('/:id', async (req, res) => {
    const data = await Wishlist.findById(req.params.id);
    res.send(data);
})

//PATCH Wishlist
router.patch('/:id', async (req, res) => {
    const data = await Wishlist.findByIdAndUpdate(req.params.id, req.body);
    res.send(data);
})

//DELETE Wishlist
router.delete('/:id', async (req, res) => {
    const data = await Wishlist.findByIdAndDelete(req.params.id);
    res.send(data);
})

module.exports = router;