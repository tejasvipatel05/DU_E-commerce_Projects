const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticate, authorize  } = require('../middleware/authMiddleware');

// Get the logged-in customer's cart
router.get('/me', authenticate, authorize('customer'), cartController.getMyCart);

// Add a product to the customer's cart
router.post('/me/products', authenticate, authorize('customer'), cartController.addProductToCart);

// Update a product's quantity in the customer's cart
router.put('/me/products/:productId', authenticate, authorize('customer'), cartController.updateProductInCart);

// Remove a specific product from the customer's cart
router.delete('/me/products/:productId', authenticate, authorize('customer'), cartController.removeProductFromCart);

// Clear the entire cart for the logged-in customer
router.delete('/me', authenticate, authorize('customer'), cartController.clearMyCart);

// Apply a coupon to the cart
router.post('/me/coupon', authenticate, authorize('customer'), cartController.applyCouponToCart);

// Remove the applied coupon from the cart
router.delete('/me/coupon', authenticate, authorize('customer'), cartController.removeCouponFromCart);



// Get all carts in the system
router.get('/', authenticate, authorize('admin'), cartController.getAllCarts);

// Get a specific user's cart
router.get('/:userId', authenticate, authorize('admin'), cartController.getCartByUserId);

// Update a specific user's cart
router.put('/:userId', authenticate, authorize('admin'), cartController.updateCartByUserId);

// Delete a specific user's cart
router.delete('/:userId', authenticate, authorize('admin'), cartController.deleteCartByUserId);


module.exports = router;