const express = require('express');

const User = require('../model/User');
const router = express.Router();

router.get('/',async(req, res) => {
    const data = await User.find();
    res.send(data);
})

// router.get('/:id', async (req, res) => {
//     const data = await User.findById(req.params.id);
//     res.send(data);
// })

router.post('/', async (req, res) => {
    const data = await User.create(req.body);
    res.send(data);
})

// Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


module.exports = router;