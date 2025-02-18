const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const categoryController = require('../controllers/categoryController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

router.get('/', authenticate, authorize('customer', 'seller', 'admin'), categoryController.getAllCategories);
router.get('/:id', authenticate, authorize('customer', 'seller', 'admin'), categoryController.getCategoryById);


router.post('/', authenticate, authorize('admin'), upload.single('category_img'), categoryController.createCategory);
router.put('/:id', authenticate, authorize('admin'), upload.single('category_img'), categoryController.updateCategory);
router.delete('/:id', authenticate, authorize('admin'), categoryController.deleteCategory);

module.exports = router;
