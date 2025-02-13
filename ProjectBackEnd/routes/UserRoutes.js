const express = require('express');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware.authenticate, authMiddleware.authorize("admin", "getAllUsers"), getAllUsers);
router.get('/:id', authMiddleware.authenticate, authMiddleware.authorize("admin", "getUserById"), getUserById);
router.patch('/:id', authMiddleware.authenticate, updateUser);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.authorize("admin", "deleteUser"), deleteUser);

module.exports = router;