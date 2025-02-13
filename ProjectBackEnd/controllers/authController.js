const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../model/User');

// User Registration
const registerUser = async (req, res) => {
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
};

// User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ user_id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1h" });
        res.json({ token, user_id: user._id });
    } catch (error) {
        console.error("Login Error: ", error);
        res.status(500).json({ message: "Internal Server error" });
    }
};


module.exports = { registerUser, loginUser };