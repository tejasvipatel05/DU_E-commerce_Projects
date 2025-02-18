const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.get('/me', authenticate, authorize('customer', 'admin'), wishlistController.getMyWishlist);
router.post('/me/products', authenticate, authorize('customer', 'admin'), wishlistController.addProductToWishlist);
router.delete('/me/products/:productId', authenticate, authorize('customer', 'admin'), wishlistController.removeProductFromWishlist);
router.put('/me', authenticate, authorize('customer', 'admin'), wishlistController.updateMyWishlist);


router.get('/', authenticate, authorize('admin'), wishlistController.getAllWishlists);
router.get('/:userId', authenticate, authorize('admin'), wishlistController.getWishlistByUserId);
router.put('/:userId', authenticate, authorize('admin'), wishlistController.updateWishlistByUserId);
router.delete('/:userId', authenticate, authorize('admin'), wishlistController.deleteWishlistByUserId);


router.get('/product/:productId', authenticate, authorize('seller', 'admin'), wishlistController.getWishlistsByProduct);

module.exports = router;