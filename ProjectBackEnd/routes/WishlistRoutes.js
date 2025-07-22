const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.get('/me', authenticate, wishlistController.getMyWishlist);
router.get('/me/:productId', authenticate, wishlistController.productInWishlist);
router.post('/me/products/:productId', authenticate, wishlistController.addProductToWishlist);
router.delete('/me/products/:productId', authenticate, wishlistController.removeProductFromWishlist);
router.put('/me', authenticate, wishlistController.updateMyWishlist);


router.get('/', authenticate, wishlistController.getAllWishlists);
router.get('/:userId', authenticate, wishlistController.getWishlistByUserId);
router.put('/:userId', authenticate, wishlistController.updateWishlistByUserId);
router.delete('/:userId', authenticate, wishlistController.deleteWishlistByUserId);


router.get('/product/:productId', authenticate, wishlistController.getWishlistsByProduct);

module.exports = router;