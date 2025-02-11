const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../model/User');
const router = express.Router();

//Middleware to verify JWT Token
const authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    if(!token) {
        return res.status(401).json({ message: "Access Denied" });
    }

    try {
        const verified = jwt.verify(token, "secret_key");
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

// User Registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, confirmpassword, first_name, last_name, phone_number, address, role, store_name, gst_number, bank_account } = req.body;

        if (!email || !password || !confirmpassword) {
            return res.status(400).json({ message: "Email and Password are required" });
        }

        if (password !== confirmpassword) {
            return res.status(400).json({ message: "passwords do not match" });
        }

        //check for user already exists or not
        const existingUser = await User.findOne({ email });
        // return res.status(403).json({ message:emaill });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // const salt = await bcrypt.genSalt(10);
        const hashedPW = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password_hash: hashedPW,
            first_name,
            last_name,
            phone_number,
            address,
            role,
            seller_details: role === 'seller' ? { store_name, gst_number, bank_account } : undefined,
            cart_id: null,
            wishlist_id: null
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user_id: newUser._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// User Login
router.post('/login', async(req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ message: "User not found." });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY, {expiresIn : "1h" });
        res.json({ token, user_id: user._id });
    } catch (error) {
        console.error("Login Error: ",error);
        res.status(500).json({ message: "Internal Server error" });
    }
});

//GET all users
router.get('/', authenticate, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//GET user by id
router.get('/:id', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//POST user
// router.post('/', async (req, res) => {
//     const data = await User.create(req.body);
//     res.send(data);
// })

//Update user
router.patch('/:id', authenticate, async (req, res) => {
    try {
        let updates = req.body;

        if(updates.password) {
            updates.password_hash = await bcrypt.hash(updates.password, 10);
            delete updates.password;  //to remove simple password
        }
        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

//Delete user
router.delete('/:id', authenticate, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;