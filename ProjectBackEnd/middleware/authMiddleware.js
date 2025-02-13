const jwt = require('jsonwebtoken');
const roles = require('../config/roles');

//Middleware to verify JWT Token
const authenticate = (req, res, next) => {
    console.log(req.headers);
    
    const token = req.headers["value"];
    console.log("token:",token);
    
    if(!token) {
        return res.status(401).json({ message: "Access Denied for authentication" });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
        req.user = decoded;  //to store user data in request
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

const authorize = (role, action) => (req, res, next) => {
    if(!roles[role] || !roles[role].includes(action)) {
        return res.status(403).json({ message: "Access Denied for authorize" });
    }
    next();
}

module.exports = { authenticate, authorize };