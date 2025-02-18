const express = require('express');

const { authenticate, authorize } = require('../middleware/authMiddleware');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Get all reviews
router.get('/', authenticate, reviewController.getAllReviews);

// Get review details by review ID
router.get('/:id', authenticate, reviewController.getReviewById);

// Get reviews for a specific product
router.get('/product/:productId', authenticate, reviewController.getReviewsByProduct);

// Get reviews written by a specific user
router.get('/user/:userId', authenticate,  reviewController.getReviewsByUser);

// Seller Get reviews for products sold by the logged-in seller
router.get('/seller', authenticate, reviewController.getReviewsForSeller);

// Create a new review
router.post('/', authenticate, authorize('admin','customer'), reviewController.createReview);

// Update an existing review
router.put('/:id', authenticate, authorize('admin','customer'), reviewController.updateReview);

// Delete a review
router.delete('/:id', authenticate, authorize('admin','customer'), reviewController.deleteReview);


module.exports = router;