const express = require('express');

const {Return} = require('../model/Return');
const router = express.Router();

//GET all return products details
router.get('/',async(req, res) => {
    const data = await Return.find();
    res.send(data);
})

//GET return detail by id
router.get('/:id', async (req, res) => {
    const data = await Return.findById(req.params.id);
    res.send(data);
})

//POST return detail
router.post('/', async (req, res) => {
    const data = await Return.create(req.body);
    res.send(data);
})

//PATCH return detail
router.patch('/:id', async (req, res) => {
    const data = await Return.findByIdAndUpdate(req.params.id, req.body);
    res.send(data);
})

//DELETE return detail
router.delete('/:id', async (req, res) => {
    const data = await Return.findByIdAndDelete(req.params.id);
    res.send(data);
})

module.exports = router;