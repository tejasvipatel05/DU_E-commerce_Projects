const express = require('express');
const User = require('../model/User')
const router = express.Router();

router.get('/', async(req,res)=>{
    const data = await User.find();
    res.send(data);
})

router.get('/:id', async(req,res)=>{
    const data = await User.findById(req.params.id);
    res.send(data);
})

router.post('/', async(req,res)=>{
    const data = await User.create(req.body);
    res.send(data);
})

module.exports = router;