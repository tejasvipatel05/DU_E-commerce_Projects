const express = require('express');

const { createCODPayment } = require("../controller/paymentController");
const { authenticate } = require("../middleware/authMiddleware");
const router = express.Router();

//Create COD Payment
router.post("/cod", authenticate, createCODPayment);

module.exports = router;