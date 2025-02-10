const express = require('express');
const bcrypt = require('bcrypt');

const {User} = require('../model/User');
const router = express.Router();




// User Registration
router.post('/register',async(req, res)=>{
    try{
        const {usernamee, emaill, passwordd, first_namee, last_namee, phone_numberr, addresss, rolee, store_namee, gst_numberr, bank_accountt} = req.body;

        //check for user already exists or not
        const existingUser = await User.findOne({emaill});
        // return res.status(403).json({ message:emaill });
        if(existingUser) {
            return res.status(400).json({ message: "User already exists"});
        }        
        
        // const salt = await bcrypt.genSalt(10);
        const hashedPW = await bcrypt.hash(passwordd, 10);
        // return res.status(403).json({ message:bank_accountt });

        const newUser = new User({
            username: usernamee,
            email: emaill,
            password_hash: hashedPW,
            first_name: first_namee,
            last_name: last_namee,
            phone_number: phone_numberr,
            address: addresss,
            role: rolee,
            seller_details: rolee === 'seller' ? {store_name: store_namee, gst_number: gst_numberr, bank_account: bank_accountt} : undefined,
            cart_id: null,
            wishlist_id : null
        });
        await newUser.save();        
        res.status(201).json({message: "User registrated successfully", user_id: newUser._id});
    } catch(error) {
        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
    }
});

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