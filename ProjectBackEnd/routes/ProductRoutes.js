const express = require('express');

const { authenticate, authorize } = require("../middleware/authMiddleware");
const router = express.Router();
const productController = require('../controllers/productController');


// Public routes (view/search)
router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProducts);
router.get('/:id', productController.getProductById);
router.get('/category/:categoryId', productController.getProductsByCategory);
router.get('/discount/:discountId', productController.getProductsByDiscount);

// Protected routes (create, update, delete)
router.post('/', authenticate, authorize('admin'), productController.createProduct);
router.put('/:id', authenticate, authorize('admin'), productController.updateProduct);
router.delete('/:id', authenticate, authorize('admin'), productController.deleteProduct);

// Seller-specific route: A seller can only view their own products unless admin.
router.get('/seller/:sellerId', authenticate, authorize('seller'), productController.getProductsBySeller);

module.exports = router;