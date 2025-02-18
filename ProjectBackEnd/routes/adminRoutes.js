const express = require("express");
const { addAdmin } = require("../controllers/adminController");
const { verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add-admin", verifyAdmin, addAdmin);

module.exports = router;
