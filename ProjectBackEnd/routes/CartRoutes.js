const express = require('express');
const router = express.Router();
const {getMyCart, addProductToCart, updateProductInCart, removeProductFromCart,clearMyCart, applyCouponToCart, removeCouponFromCart, getAllCarts,getCartByUserId,updateCartByUserId,deleteCartByUserId} = require('../controllers/cartController');
const { authenticate, authorize  } = require('../middleware/authMiddleware');

// Get the logged-in customer's cart
router.get('/me', authenticate, authorize('getMyCart'), getMyCart);

// Add a product to the customer's cart
router.post('/me/products', authenticate, authorize('addProductToCart'), addProductToCart);

// Update a product's quantity in the customer's cart
router.put('/me/products/:productId', authenticate, authorize('updateProductInCart'), updateProductInCart);

// Remove a specific product from the customer's cart
router.delete('/me/products/:productId', authenticate, authorize('removeProductFromCart'), removeProductFromCart);

// Clear the entire cart for the logged-in customer
router.delete('/me', authenticate, authorize('clearMyCart'), clearMyCart);

// Apply a coupon to the cart
router.post('/me/coupon', authenticate, authorize('applyCouponToCart'), applyCouponToCart);

// Remove the applied coupon from the cart
router.delete('/me/coupon', authenticate, authorize('removeCouponFromCart'), removeCouponFromCart);



// Get all carts in the system
router.get('/', authenticate, authorize('getAllCarts'), getAllCarts);

// Get a specific user's cart
router.get('/:userId', authenticate, authorize('getCartByUserId'), getCartByUserId);

// Update a specific user's cart
router.put('/:userId', authenticate, authorize('updateCartByUserId'), updateCartByUserId);

// Delete a specific user's cart
router.delete('/:userId', authenticate, authorize('deleteCartByUserId'), deleteCartByUserId);


module.exports = router;