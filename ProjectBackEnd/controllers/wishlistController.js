const { Wishlist } = require("../model/Wishlist");
const { User } = require("../model/User");

//customer GET own wishlist 
exports.getMyWishlist = async (req, res) => {
    try {
      // req.user is assumed to be populated by your auth middleware.
      const wishlist = await Wishlist.findById(req.user.wishlist_id).populate('products');
      return res.json(wishlist);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching wishlist', error });
    }
};

//Customer Add product to wishlist
exports.addProductToWishlist = async (req, res) => {
    try {
      const { productId } = req.body;
      const wishlist = await Wishlist.findById(req.user.wishlist_id);
      
      // Avoid duplicate entries
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
        await wishlist.save();
      }
      return res.json(wishlist);
    } catch (error) {
      return res.status(500).json({ message: 'Error adding product', error });
    }
};

//Customer Remove Product from wishlist
exports.removeProductFromWishlist = async (req, res) => {
    try {
      const { productId } = req.params;
      const wishlist = await Wishlist.findById(req.user.wishlist_id);
      wishlist.products = wishlist.products.filter(pId => pId.toString() !== productId);
      await wishlist.save();
      return res.json(wishlist);
    } catch (error) {
      return res.status(500).json({ message: 'Error removing product', error });
    }
};

//Customer Updates Wishlist
exports.updateMyWishlist = async (req, res) => {
    try {
      const { products } = req.body;
      const wishlist = await Wishlist.findByIdAndUpdate(
        req.user.wishlist_id,
        { products },
        { new: true }
      );
      return res.json(wishlist);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating wishlist', error });
    }
};

//Admin GetAll wishlist
exports.getAllWishlists = async (req, res) => {
    try {
      const wishlists = await Wishlist.find().populate('products');
      return res.json(wishlists);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching wishlists', error });
    }
};

//Admin GET specific Wishlist
exports.getWishlistByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      // Assuming each user’s wishlist _id is stored in the User schema
      const user = await User.findById(userId);
      if (!user || !user.wishlist_id) {
        return res.status(404).json({ message: 'User or wishlist not found' });
      }
      const wishlist = await Wishlist.findById(user.wishlist_id).populate('products');
      return res.json(wishlist);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching wishlist', error });
    }
};

//Admin Updtaes specific Wishlist
exports.updateWishlistByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const { products } = req.body;
      const user = await User.findById(userId);
      if (!user || !user.wishlist_id) {
        return res.status(404).json({ message: 'User or wishlist not found' });
      }
      const wishlist = await Wishlist.findByIdAndUpdate(
        user.wishlist_id,
        { products },
        { new: true }
      );
      return res.json(wishlist);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating wishlist', error });
    }
};

//Admin deletes specific Wishlist
exports.deleteWishlistByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user || !user.wishlist_id) {
        return res.status(404).json({ message: 'User or wishlist not found' });
      }
      await Wishlist.findByIdAndDelete(user.wishlist_id);
      // Optionally, remove the wishlist reference from the user document.
      user.wishlist_id = null;
      await user.save();
      return res.json({ message: 'Wishlist deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting wishlist', error });
    }
};

//Seller-Admin GET all wishlist for a specific Product
exports.getWishlistsByProduct = async (req, res) => {
    try {
      const { productId } = req.params;
      const wishlists = await Wishlist.find({ products: productId }).populate('products');
      return res.json(wishlists);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching wishlists', error });
    }
  };