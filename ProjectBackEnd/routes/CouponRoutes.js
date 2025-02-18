const express = require('express');

const couponController = require('../controllers/couponController');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.get('/', authenticate, authorize('customer'), couponController.getAllCoupons);
router.get('/:id', authenticate, authorize('customer'), couponController.getCouponById);


router.post('/', authenticate, authorize('admin'), couponController.createCoupon);
router.put('/:id', authenticate, authorize('admin'), couponController.updateCoupon);
router.delete('/:id', authenticate, authorize('admin'), couponController.deleteCoupon);

module.exports = router;
