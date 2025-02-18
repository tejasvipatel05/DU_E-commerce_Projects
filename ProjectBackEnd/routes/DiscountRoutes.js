const express = require('express');

const discountController = require('../controllers/discountController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authenticate, discountController.getAllDiscounts);
router.get('/:id', authenticate, discountController.getDiscountById);
router.get('/product/:productId', authenticate, discountController.getDiscountsByProduct);
router.get('/category/:categoryId', authenticate, discountController.getDiscountsByCategory);

router.post('/', authenticate, authorize('admin','seller'), discountController.createDiscount);
router.put('/:id', authenticate, authorize('admin','seller'), discountController.updateDiscount);
router.delete('/:id', authenticate, authorize('admin','seller'), discountController.deleteDiscount);


module.exports = router;
