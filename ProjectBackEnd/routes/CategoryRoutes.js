const express = require('express');
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/',  authMiddleware.authenticate, getAllCategories);
router.get('/:id', authMiddleware.authenticate, getCategoryById);
router.post('/', authMiddleware.authenticate, authMiddleware.authorize("admin", "createCategory"), createCategory);
router.patch('/:id', authMiddleware.authenticate, authMiddleware.authorize("admin", "updateCategory"), updateCategory);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.authorize("admin", "deleteCategory"), deleteCategory);


module.exports = router;