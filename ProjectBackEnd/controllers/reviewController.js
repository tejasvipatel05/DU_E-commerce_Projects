const {Review} = require('../model/Review');
const {Product} = require('../model/Product');

//GET ALL review
const getAllReviews = async (req, res) => {
 try {
   const reviews = await Review.find()
     .populate('product_id')
     .populate('user_id');
   res.json(reviews);
 } catch (error) {
   res.status(500).json({ message: 'Error fetching reviews', error });
 }
};

//GET review by ID
const getReviewById = async (req, res) => {
 try {
   const review = await Review.findById(req.params.id)
     .populate('product_id')
     .populate('user_id');
   if (!review) return res.status(404).json({ message: 'Review not found' });
   res.json(review);
 } catch (error) {
   res.status(500).json({ message: 'Error fetching review', error });
 }
};

//GET ALL review for specific product
const getReviewsByProduct = async (req, res) => {
 try {
   const reviews = await Review.find({ product_id: req.params.productId })
     .populate('product_id')
     .populate('user_id');
   res.json(reviews);
 } catch (error) {
   res.status(500).json({ message: 'Error fetching reviews for product', error });
 }
};

//GET ALL review by specific Customer
const getReviewsByUser = async (req, res) => {
 try {
   // If the logged-in user is a customer and not an admin, ensure they can only view their own reviews.
   if (req.user.role === 'customer' && req.user._id.toString() !== req.params.userId) {
     return res.status(403).json({ message: 'Access denied' });
   }
   const reviews = await Review.find({ user_id: req.params.userId })
     .populate('product_id')
     .populate('user_id');
   res.json(reviews);
 } catch (error) {
   res.status(500).json({ message: 'Error fetching reviews by user', error });
 }
};

//Seller GET review for product owned
const getReviewsForSeller = async (req, res) => {
 try {
   // Find all products for which the seller is the owner.
   // Assuming the Product model has a seller_id field.
   const sellerProducts = await Product.find({ seller_id: req.user._id }, '_id');
   const productIds = sellerProducts.map(prod => prod._id);

   // Now, find reviews for those products.
   const reviews = await Review.find({ product_id: { $in: productIds } })
     .populate('product_id')
     .populate('user_id');
   res.json(reviews);
 } catch (error) {
   res.status(500).json({ message: 'Error fetching reviews for seller', error });
 }
};

//create new review
const createReview = async (req, res) => {
 try {
   const { product_id, rating, comment } = req.body;
   
   // Optionally, you may check if the customer already reviewed the product.
   const existingReview = await Review.findOne({ 
     product_id, 
     user_id: req.user._id 
   });
   if (existingReview) {
     return res.status(400).json({ message: 'You have already reviewed this product' });
   }
   
   const newReview = new Review({
     product_id,
     user_id: req.user._id,
     rating,
     comment
   });
   await newReview.save();
   res.status(201).json(newReview);
 } catch (error) {
   res.status(500).json({ message: 'Error creating review', error });
 }
};

//Update review
const updateReview = async (req, res) => {
 try {
   const review = await Review.findById(req.params.id);
   if (!review) return res.status(404).json({ message: 'Review not found' });
   
   // Check if the user is the author or an admin.
   if (req.user.role === 'customer' && review.user_id.toString() !== req.user._id.toString()) {
     return res.status(403).json({ message: 'Access denied' });
   }
   
   // Update allowed fields (rating and comment)
   review.rating = req.body.rating || review.rating;
   review.comment = req.body.comment || review.comment;
   
   await review.save();
   res.json(review);
 } catch (error) {
   res.status(500).json({ message: 'Error updating review', error });
 }
};

//Delete Review
const deleteReview = async (req, res) => {
 try {
   const review = await Review.findById(req.params.id);
   if (!review) return res.status(404).json({ message: 'Review not found' });
   
   // Check if the user is the author or an admin.
   if (req.user.role === 'customer' && review.user_id.toString() !== req.user._id.toString()) {
     return res.status(403).json({ message: 'Access denied' });
   }
   
   await review.remove();
   res.json({ message: 'Review deleted successfully' });
 } catch (error) {
   res.status(500).json({ message: 'Error deleting review', error });
 }
};

module.exports = {getAllReviews,getReviewById,getReviewsByProduct,getReviewsByUser,getReviewsForSeller,createReview,updateReview,deleteReview }
