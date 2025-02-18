const {Product} = require('../model/Product');

//GET all products
exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find().populate('category_id discount_id seller_id');
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error });
    }
};

//GET Product by id
exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate('category_id discount_id seller_id');
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product', error });
    }
};

//GET product by category
exports.getProductsByCategory = async (req, res) => {
    try {
      const products = await Product.find({ category_id: req.params.categoryId }).populate('category_id discount_id seller_id');
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products by category', error });
    }
};

//GET product by discount
exports.getProductsByDiscount = async (req, res) => {
    try {
      const products = await Product.find({ discount_id: req.params.discountId }).populate('category_id discount_id seller_id');
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products by discount', error });
    }
};

//Seach Product
exports.searchProducts = async (req, res) => {
    try {
      const query = req.query.query;
      const products = await Product.find({
        $or: [
          { product_name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ]
      }).populate('category_id discount_id seller_id');
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error searching products', error });
    }
  };

//POST Product
exports.createProduct = async (req, res) => {
    try {
      const productData = req.body;
      // For sellers, ensure the seller_id is the authenticated user's ID.
      if (req.user.role === 'seller') {
        productData.seller_id = req.user._id;
      }
      const product = new Product(productData);
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error });
    }
  };

//PATCH Product
exports.updateProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      
      // Only the seller who owns the product or an admin can update.
      if (req.user.role === 'seller' && product.seller_id.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Forbidden: You can only update your own product' });
      }
      
      Object.assign(product, req.body);
      await product.save();
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error updating product', error });
    }
};

//DELETE Product
exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      
      // Only the seller who owns the product or an admin can delete.
      if (req.user.role === 'seller' && product.seller_id.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Forbidden: You can only delete your own product' });
      }
      
      await product.remove();
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error });
    }
};

//GET product for specific seller
exports.getProductsBySeller = async (req, res) => {
    try {
      // If the user is a seller, they can only view their own products.
      if (req.user.role === 'seller' && req.user._id.toString() !== req.params.sellerId) {
        return res.status(403).json({ message: 'Forbidden: You can only view your own products' });
      }
      
      const products = await Product.find({ seller_id: req.params.sellerId }).populate('category_id discount_id seller_id');
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching seller products', error });
    }
  };

module.exports = {getAllProduct, getProductById, createProduct, updateProduct, deleteProduct};
