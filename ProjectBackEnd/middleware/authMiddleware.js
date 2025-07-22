const jwt = require('jsonwebtoken');
const roles = require('../config/roles');
const User = require("../model/User");
require('dotenv').config();

//Middleware to verify JWT Token
// const authenticate = async (req, res, next) => {
//     console.log("Headers:",req.headers);
    
//     const token = req.headers["authorization"];
//     console.log("token:",token);
    
//     if(!token) {
//         return res.status(401).json({ message: "Access Denied for authentication" });
//     }

//     try {
//         const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
//         const user = await User.findById(decoded.userId); // Fetch user from DB

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         req.user = user;  // Attach full user to request
//         next();
//     } catch (error) {
//         res.status(400).json({ message: "Invalid Token" });
//     }
// };

const authenticate = (req, res, next) => {
    // console.log("Request Headers:", req.headers); // ✅ Log all headers
    // console.log("Expected JWT Secret:", process.env.SECRET_KEY);

    const authHeader = req.headers["authorization"];
    console.log("Authorization Header:", authHeader);

    if (!authHeader) {
        return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    try {
        const token = authHeader.split(" ")[1]; // Extract token after "Bearer "

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;  // Store user data in request
        console.log("Decoded User:", req.user);

        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        res.status(400).json({ message: "Invalid Token" });
    }
};


const authorize = (action) => (req, res, next) => {

    const userRole = req.user.role;
    if(!roles[userRole] || !roles[userRole].includes(action)) {
        return res.status(403).json({ message: "Access Denied for authorize" });
    }
    next();
}


const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        req.user = user; // Attach user to request
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
};

module.exports = { authenticate, authorize, verifyAdmin };