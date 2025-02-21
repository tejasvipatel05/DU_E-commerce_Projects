const express = require('express');

const { authenticate, authorize } = require('../middleware/authMiddleware');
const { createReturnRequest, getUserReturns, getReturnById, updateReturnRequest, getAllReturnProduct } = require('../controllers/returnController');
const router = express.Router();

//GET all return details
router.get('/', authenticate, authorize("getAllReturnProduct"), getAllReturnProduct)

//GET return product
router.get('/product', authenticate, authorize("getUserReturns"), getUserReturns)

//GET return detail by id
router.get('/:id', authenticate, authorize("getReturnById"), getReturnById)

//POST return detail
router.post('/', authenticate, authorize("createReturnRequest"), createReturnRequest);

//PATCH(update) return detail
router.patch('/:id', authenticate, authorize("updateReturnRequest"), updateReturnRequest)

module.exports = router;