const express = require('express');
const {getMyOrders, getOrderByIdForCustomer,getOrderDetails, createOrder, updateOrderForCustomer, deleteOrderForCustomer, getOrdersForSeller, getOrderByIdForSeller, getAllOrders, getOrderByIdForAdmin, updateOrder, deleteOrder} = require('../controllers/orderController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/me', authenticate, getMyOrders);
router.get('/details/:orderID', authenticate, getOrderDetails);  // Use orderID as the parameter
router.get('/me/:orderId', authenticate, authorize('getOrderByIdForCustomer'), getOrderByIdForCustomer);
router.post('/', authenticate, createOrder);
router.put('/me/:orderId', authenticate, authorize('updateOrderForCustomer'), updateOrderForCustomer);
router.delete('/me/:orderId', authenticate, authorize('deleteOrderForCustomer'), deleteOrderForCustomer);

router.get('/seller', authenticate, authorize('getOrdersForSeller'), getOrdersForSeller);
router.get('/seller/:orderId', authenticate, authorize('getOrderByIdForSeller'), getOrderByIdForSeller);

router.get('/admin', authenticate, authorize('getAllOrders'), getAllOrders);
router.get('/admin/:orderId', authenticate, authorize('getOrderByIdForAdmin'), getOrderByIdForAdmin);
router.put('/admin/:orderId', authenticate, authorize('updateOrder'), updateOrder);
router.delete('/admin/:orderId', authenticate, authorize('deleteOrder'), deleteOrder);


module.exports = router;