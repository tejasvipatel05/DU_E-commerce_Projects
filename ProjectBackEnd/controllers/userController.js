const { User } = require('../model/User');

//GET all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const userProfile = async (req, res) => {
    try {        
      const user = await User.findById(req.user.user_id); // Exclude password
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

//GET user by id
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//Update user
const updateUser = async (req, res) => {
    try {
        let updates = req.body;

        if(updates.password) {
            updates.password_hash = await bcrypt.hash(updates.password, 10);
            delete updates.password;  //to remove simple password
        }
        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
        res.json({ message: "User updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//Delete user
// const deleteUser = async (req, res) => {
//     try {
//         console.log(user.role);
        
//         if (req.User.role !== "admin") {
//             return res.status(403).json({ message: "Access Denied" })
//         }
//         await User.findByIdAndDelete(req.params.id);
//         res.json({ message: "User deleted successfully" });
//     } catch (error) {
//         console.log(error);
        
//         res.status(500).json({ message: "Error deleting user" });
//     }
// };
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.findByIdAndDelete(userId);
        res.json({ message: "User deleted successfully" });

    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { getAllUsers, userProfile, getUserById, updateUser, deleteUser };