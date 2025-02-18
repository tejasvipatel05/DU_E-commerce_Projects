const express = require('express');
const orderController = require('../controllers/orderController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/me', authenticate, authorize('customer'), orderController.getMyOrders);
router.get('/me/:orderId', authenticate, authorize('customer'), orderController.getOrderByIdForCustomer);
router.post('/', authenticate, authorize('customer'), orderController.createOrder);
router.put('/me/:orderId', authenticate, authorize('customer'), orderController.updateOrderForCustomer);
router.delete('/me/:orderId', authenticate, authorize('customer'), orderController.deleteOrderForCustomer);

router.get('/seller', authenticate, authorize('seller'), orderController.getOrdersForSeller);
router.get('/seller/:orderId', authenticate, authorize('seller'), orderController.getOrderByIdForSeller);

router.get('/admin', authenticate, authorize('admin'), orderController.getAllOrders);
router.get('/admin/:orderId', authenticate, authorize('admin'), orderController.getOrderByIdForAdmin);
router.put('/admin/:orderId', authenticate, authorize('admin'), orderController.updateOrder);
router.delete('/admin/:orderId', authenticate, authorize('admin'), orderController.deleteOrder);


module.exports = router;