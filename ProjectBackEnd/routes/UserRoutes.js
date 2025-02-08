const express = require('express');

const {User} = require('../model/User');
const router = express.Router();

//GET all users
router.get('/',async(req, res) => {
    const data = await User.find();
    res.send(data);
})

//GET user by id
router.get('/:id', async (req, res) => {
    const data = await User.findById(req.params.id);
    res.send(data);
})

//POST user
router.post('/', async (req, res) => {
    const data = await User.create(req.body);
    res.send(data);
})

//PATCH user
router.patch('/:id', async (req, res) => {
    const data = await User.findByIdAndUpdate(req.params.id, req.body);
    res.send(data);
})

//DELETE user
router.delete('/:id', async (req, res) => {
    const data = await User.findByIdAndDelete(req.params.id);
    res.send(data);
})

module.exports = router;