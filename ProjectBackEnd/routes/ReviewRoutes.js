const express = require('express');

const { authenticate, authorize } = require('../middleware/authMiddleware');
const router = express.Router();
const {getAllReviews,getReviewById,getReviewsByProduct,getReviewsByUser,getReviewsForSeller,createReview,updateReview,deleteReview } = require('../controllers/reviewController');

// Get all reviews
router.get('/', authenticate, getAllReviews);

// Get review details by review ID
router.get('/:id', authenticate, getReviewById);

// Get reviews for a specific product
router.get('/product/:productId', authenticate, getReviewsByProduct);

// Get reviews written by a specific user
router.get('/user/:userId', authenticate,  getReviewsByUser);

// Seller Get reviews for products sold by the logged-in seller
router.get('/seller', authenticate, getReviewsForSeller);

// Create a new review
router.post('/', authenticate, authorize('createReview'), createReview);

// Update an existing review
router.put('/:id', authenticate, authorize('updateReview'), updateReview);

// Delete a review
router.delete('/:id', authenticate, authorize('deleteReview'), deleteReview);


module.exports = router;