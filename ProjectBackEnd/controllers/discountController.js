const Discount = require('../model/Discount');
const Product = require('../model/Product'); 

//GET all discount
exports.getAllDiscounts = async (req, res) => {
    try {
      let query = {};
      if (req.user.role === 'customer' || req.user.role === 'seller') {
        query = {
          is_active: true,
          expiration_date: { $gt: new Date() }
        };
      }
      const discounts = await Discount.find(query)
        .populate('product_id')
        .populate('category_id');
      res.json(discounts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching discounts', error });
    }
};

//GET discount by ID
exports.getDiscountById = async (req, res) => {
    try {
      const discount = await Discount.findById(req.params.id)
        .populate('product_id')
        .populate('category_id');
      if (!discount) return res.status(404).json({ message: 'Discount not found' });
      // For non-admins, enforce active & non-expired rule.
      if ((req.user.role === 'customer' || req.user.role === 'seller') &&
          (!discount.is_active || discount.expiration_date <= new Date())) {
        return res.status(403).json({ message: 'Discount is not available' });
      }
      res.json(discount);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching discount', error });
    }
};

//GET discount by product
exports.getDiscountsByProduct = async (req, res) => {
    try {
      let query = { product_id: req.params.productId };
      if (req.user.role === 'customer' || req.user.role === 'seller') {
        query.is_active = true;
        query.expiration_date = { $gt: new Date() };
      }
      const discounts = await Discount.find(query)
        .populate('product_id')
        .populate('category_id');
      res.json(discounts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching discounts by product', error });
    }
};

//GET discount by category
exports.getDiscountsByCategory = async (req, res) => {
    try {
      let query = { category_id: req.params.categoryId };
      if (req.user.role === 'customer' || req.user.role === 'seller') {
        query.is_active = true;
        query.expiration_date = { $gt: new Date() };
      }
      const discounts = await Discount.find(query)
        .populate('product_id')
        .populate('category_id');
      res.json(discounts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching discounts by category', error });
    }
};

//Create Discount 
exports.createDiscount = async (req, res) => {
    try {
      const { product_id, category_id, discount_type, value, expiration_date, is_active } = req.body;
      
      // If a seller is creating a discount, validate ownership of the product.
      if (req.user.role === 'seller') {
        const product = await Product.findById(product_id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        if (product.seller_id.toString() !== req.user._id.toString()) {
          return res.status(403).json({ message: 'Forbidden: You can only create discounts for your own products.' });
        }
      }
      
      const newDiscount = new Discount({
        product_id,
        category_id,
        discount_type,
        value,
        expiration_date,
        is_active
      });
      await newDiscount.save();
      res.status(201).json(newDiscount);
    } catch (error) {
      res.status(500).json({ message: 'Error creating discount', error });
    }
};

//Update Discount
exports.updateDiscount = async (req, res) => {
    try {
      // Find the discount and populate the product to check ownership.
      let discount = await Discount.findById(req.params.id).populate('product_id');
      if (!discount) return res.status(404).json({ message: 'Discount not found' });
      
      if (req.user.role === 'seller') {
        if (!discount.product_id || discount.product_id.seller_id.toString() !== req.user._id.toString()) {
          return res.status(403).json({ message: 'Forbidden: You can only update discounts for your own products.' });
        }
      }
      
      discount = await Discount.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(discount);
    } catch (error) {
      res.status(500).json({ message: 'Error updating discount', error });
    }
};

//Delete Discount
exports.deleteDiscount = async (req, res) => {
    try {
      // Find the discount and populate product_id for ownership check.
      const discount = await Discount.findById(req.params.id).populate('product_id');
      if (!discount) return res.status(404).json({ message: 'Discount not found' });
      
      if (req.user.role === 'seller') {
        if (!discount.product_id || discount.product_id.seller_id.toString() !== req.user._id.toString()) {
          return res.status(403).json({ message: 'Forbidden: You can only delete discounts for your own products.' });
        }
      }
      
      await Discount.findByIdAndDelete(req.params.id);
      res.json({ message: 'Discount deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting discount', error });
    }
};