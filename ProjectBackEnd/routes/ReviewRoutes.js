const express = require('express');

const {Review} = require('../model/Review');
const router = express.Router();

//GET all Review
router.get('/',async(req, res) => {
    const data = await Review.find();
    res.send(data);
})

//GET Review by id
router.get('/:id', async (req, res) => {
    const data = await Review.findById(req.params.id);
    res.send(data);
})

//POST new Review
router.post('/', async (req, res) => {
    const data = await Review.create(req.body);
    res.send(data);
})

//PATCH Review
router.patch('/:id', async (req, res) => {
    const data = await Review.findByIdAndUpdate(req.params.id, req.body);
    res.send(data);
})

//DELETE Review
router.delete('/:id', async (req, res) => {
    const data = await Review.findByIdAndDelete(req.params.id);
    res.send(data);
})

module.exports = router;