const express = require('express');
const router = express.Router();
const {getMyCart, addProductToCart, updateProductInCart, removeProductFromCart,clearMyCart, applyCouponToCart, removeCouponFromCart, getAllCarts,getCartByUserId,updateCartByUserId,deleteCartByUserId} = require('../controllers/cartController');
const { authenticate, authorize  } = require('../middleware/authMiddleware');

router.get('/me',authenticate, getMyCart);
router.post('/me/products', authenticate, addProductToCart);
router.put('/me/products/:productId',authenticate, updateProductInCart);
router.delete('/me/products/:productId', authenticate, removeProductFromCart);
router.delete('/me', authenticate, clearMyCart);
router.post('/me/coupon', authenticate, applyCouponToCart);
router.delete('/me/coupon', authenticate, removeCouponFromCart);

// Get all carts in the system
router.get('/', authenticate, authorize('getAllCarts'), getAllCarts);

// Get a specific user's cart
router.get('/:userId', authenticate, authorize('getCartByUserId'), getCartByUserId);

// Update a specific user's cart
router.put('/:userId', authenticate, authorize('updateCartByUserId'), updateCartByUserId);

// Delete a specific user's cart
router.delete('/:userId', authenticate, authorize('deleteCartByUserId'), deleteCartByUserId);


module.exports = router;