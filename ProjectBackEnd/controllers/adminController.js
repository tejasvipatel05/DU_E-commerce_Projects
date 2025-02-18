const User = require("../model/User");

const addAdmin = async (req, res) => {
    try {
        const { email, phone_number, full_name, password } = req.body;
        const adminId = req.user.userId; // Get logged-in admin's ID

        // Check if the requesting user is an admin
        const requestingUser = await User.findById(adminId);
        if (!requestingUser || requestingUser.role !== "admin") {
            return res.status(403).json({ message: "Only admins can add other admins." });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ phone_number }, { email }] }).lean();
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Hash password
        const hashedPW = await bcrypt.hash(password, 10);

        // Create new admin
        const newAdmin = new User({
            email,
            phone_number,
            full_name,
            password_hash: hashedPW,
            role: "admin",
            isActive: true
        });

        await newAdmin.save();
        res.status(201).json({ message: "Admin added successfully", user_id: newAdmin._id });

    } catch (error) {
        console.error("Error adding admin:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = { addAdmin };
