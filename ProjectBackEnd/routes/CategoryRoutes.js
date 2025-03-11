const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const {getAllCategories,getCategoryById,createCategory,updateCategory,deleteCategory} = require('../controllers/categoryController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

// router.get('/', authenticate, authorize('getAllCategories'), getAllCategories);
router.get('/', getAllCategories);
router.get('/:id', authenticate, authorize('getCategoryById'), getCategoryById);


router.post('/', authenticate, authorize('createCategory'), upload.single('category_img'), createCategory);
router.put('/:id', authenticate, authorize('updateCategory'), upload.single('category_img'), updateCategory);
router.delete('/:id', authenticate, authorize('deleteCategory'), deleteCategory);

module.exports = router;
