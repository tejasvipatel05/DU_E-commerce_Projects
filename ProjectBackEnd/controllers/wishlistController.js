const { Wishlist } = require("../model/Wishlist");
const { User } = require("../model/User");

//customer GET own wishlist 
const getMyWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id).select("wishlist_id");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("USER-----------", user);


    if (!user.wishlist_id) {
      return res.status(200).json({ message: "Wishlist is empty", wishlist: null });
    }

    // req.user is assumed to be populated by your auth middleware.
    const wishlist = await Wishlist.findById(user.wishlist_id)
      .populate('products.product_id');

    if (!wishlist) {
      return res.status(404).json({ message: "wihslist not found" });
    }
    console.log(wishlist);
    res.json(wishlist);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

const productInWishlist = async (req, res) => {
    const { productId } = req.params;
    console.log("PRODUCTid====",req.params);

    const user = await User.findById(req.user.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("USER-----------", user);

    let wishlist;
    // Create a new cart if none exists
    if (!user.wishlist_id) {
      wishlist = new Wishlist({ products: [] });
      // console.log("herreee in if");

      await wishlist.save();
      user.wishlist_id = wishlist._id;
      await user.save();
    } else {
      console.log("hereee in else");
      
      wishlist = await Wishlist.findById(user.wishlist_id);
    }

    // const wishlist = await Wishlist.findById(user.wishlist_id);
    console.log("wishlist", wishlist);

    // Avoid duplicate entries
    const isProductInWishlist = wishlist.products.some(p => p.product_id.toString() === productId.toString());
    if (!isProductInWishlist) {
      console.log("not in wishlistM");      
      return false;
    }
    else{
      console.log("is in wishlist");
      return true;
    }
  }

//Customer Add product to wishlist
const addProductToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log("PRODUCTid====",req.params);

    const user = await User.findById(req.user.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("USER-----------", user);

    let wishlist;
    // Create a new cart if none exists
    if (!user.wishlist_id) {
      wishlist = new Wishlist({ products: [] });
      // console.log("herreee in if");

      await wishlist.save();
      user.wishlist_id = wishlist._id;
      await user.save();
    } else {
      console.log("hereee in else");
      
      wishlist = await Wishlist.findById(user.wishlist_id);
    }

    // const wishlist = await Wishlist.findById(user.wishlist_id);
    console.log("wishlist", wishlist);

    // Avoid duplicate entries
    const isProductInWishlist = wishlist.products.findIndex(p => p.product_id.toString() === productId.toString());
    
    if (isProductInWishlist === -1) {
      wishlist.products.push({ product_id: productId });  // Pushing as an object with product_id
      await wishlist.save();
      return res.status(200).json({ message: 'Product inserted in wishlist' });
    }else {
      wishlist.products.splice(isProductInWishlist, 1);
      await wishlist.save();
      return res.status(200).json({ message: 'Product removed from wishlist' });
  }
    return res.json(wishlist);
  } catch (error) {
    return res.status(500).json({ message: 'Error adding product to wishlist', error });
  }
};


//Customer Remove Product from wishlist
const removeProductFromWishlist = async (req, res) => {
  try {

    const { productId } = req.params;
    const user = await User.findById(req.user.user_id).select("wishlist_id");
    console.log("req.params----------", typeof(productId));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("USER-----------", user);


    if (!user.wishlist_id) {
      return res.status(200).json({ message: "Wishlist is empty", wishlist: null });
    }
    console.log("REQUEST-----------------", user.wishlist_id);
    const wishlist = await Wishlist.findById(user.wishlist_id);
    wishlist.products = wishlist.products.filter(pId => pId.product_id.toString() !== productId);

    await wishlist.save();
    return res.json(wishlist);
  } catch (error) {
    return res.status(500).json({ message: 'Error removing product', error });
  }
};

//Customer Updates Wishlist
const updateMyWishlist = async (req, res) => {
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
const getAllWishlists = async (req, res) => {
  try {
    const wishlists = await Wishlist.find().populate('products');
    return res.json(wishlists);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching wishlists', error });
  }
};

//Admin GET specific Wishlist
const getWishlistByUserId = async (req, res) => {
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
const updateWishlistByUserId = async (req, res) => {
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
const deleteWishlistByUserId = async (req, res) => {
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
const getWishlistsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const wishlists = await Wishlist.find({ products: productId }).populate('products');
    return res.json(wishlists);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching wishlists', error });
  }
};

module.exports = { getMyWishlist,productInWishlist, addProductToWishlist, deleteWishlistByUserId, getWishlistByUserId, getAllWishlists, getWishlistsByProduct, updateWishlistByUserId, updateMyWishlist, removeProductFromWishlist }