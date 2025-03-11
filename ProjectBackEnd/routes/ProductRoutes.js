const express = require('express');

const { authenticate, authorize } = require("../middleware/authMiddleware");
const router = express.Router();
const productController = require('../controllers/productController');


// Public routes (view/search)
router.get('/', productController.getProducts);
router.get("/best-sellers", productController.getBestSellingProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/popular', productController.getPopularProducts);
router.get("/new-arrivals", productController.getJustArrivedProducts);
router.get('/category/:categoryId', productController.getProductsByCategory);
router.get('/:id', productController.getProductById);


// Protected routes (create, update, delete)
router.post('/', authenticate, authorize('admin'), productController.createProduct);
router.put('/:id', authenticate, authorize('admin'), productController.updateProduct);
router.delete('/:id', authenticate, authorize('admin'), productController.deleteProduct);

// Seller-specific route: A seller can only view their own products unless admin.
router.get('/seller/:sellerId', authenticate, authorize('seller'), productController.getProductsBySeller);

module.exports = router;