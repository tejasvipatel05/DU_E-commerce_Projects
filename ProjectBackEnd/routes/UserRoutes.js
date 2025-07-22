const express = require('express');
const { getAllUsers, userProfile, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const {authenticate, authorize} = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticate, authorize("getAllUsers"), getAllUsers);
router.get("/profile", authenticate, userProfile);
router.get('/:id', authenticate, authorize("admin", "getUserById"), getUserById);
router.patch('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, authorize("admin", "deleteUser"), deleteUser);

module.exports = router;