const express = require('express');

const {Category} = require('../model/Category');
const router = express.Router();

//GET all categories
router.get('/',async(req, res) => {
    const data = await Category.find();
    res.send(data);
})

//GET category by id
router.get('/:id', async (req, res) => {
    const data = await Category.findById(req.params.id);
    res.send(data);
})

//POST category
router.post('/', async (req, res) => {
    const data = await Category.create(req.body);
    res.send(data);
})

//PATCH category
router.patch('/:id', async (req, res) => {
    const data = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.send(data);
})

//DELETE category
router.delete('/:id', async (req, res) => {
    const data = await Category.findByIdAndDelete(req.params.id);
    res.send(data);
})

module.exports = router;