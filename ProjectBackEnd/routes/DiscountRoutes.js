const express = require('express');

const { Discount } = require('../model/Discount');
const router = express.Router();


//GET all discount
router.get('/',async(req, res) => {
    const data = await Discount.find();
    res.send(data);
})

//GET Discount by id
router.get('/:id', async (req, res) => {
    const data = await Discount.findById(req.params.id);
    res.send(data);
})

//POST Discount (admin)
router.post('/', async (req, res) => {
    const data = await Discount.create(req.body);
    res.send(data);
})

//PATCH Discount (admin)
router.patch('/:id', async (req, res) => {
    const data = await Discount.findByIdAndUpdate(req.params.id, req.body);
    res.send(data);
})

//DELETE Discount
router.delete('/:id', async (req, res) => {
    const data = await Discount.findByIdAndDelete(req.params.id);
    res.send(data);
})


module.exports = router;
