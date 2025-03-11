const {Cart} = require('../model/Cart');
const {User} = require('../model/User');
const {Coupon} = require('../model/Coupon');

//GET customer's own cart
const getMyCart = async (req, res) => {
    try {
      const user = req.user;
      if (!user.cart_id) {
        return res.json({ message: 'Cart is empty', cart: null });
      }
      const cart = await Cart.findById(user.cart_id)
      .populate('products.product_id')
      .populate('products.seller_id')
      .populate('appliedCoupon');
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching cart', error });
    }
};

//Add product to customer's cart
const addProductToCart = async (req, res) => {
    try {

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

      const { product_id, seller_id, quantity } = req.body;
      const userId = req.user.user_id;

      // Fetch the user document
      let user = await User.findById(userId);
      if(!user){
        return res.status(404).json({ message: "User not found" });
      }

      let cart;
      // Create a new cart if none exists
      if (!user.cart_id) {
        cart = new Cart({ products: [] });

        await cart.save();
        user.cart_id = cart._id;
        await user.save();
      } else {
        cart = await Cart.findById(user.cart_id);
      }
      
      // Check if product already exists in the cart (match product_id & seller_id)
      const index = cart.products.findIndex(item =>
        item.product_id.toString() === product_id &&
        item.seller_id.toString() === seller_id
      );
      
  
      if (index > -1) {
        // Increase quantity if product exists
        cart.products[index].quantity += quantity;
      } else {
        // Otherwise, add the product as new
        cart.products.push({ product_id, seller_id, quantity });
      }
  
      await cart.save();
      res.status(200).json({ message: "Product added to cart", cart });
    } catch (error) {
      res.status(500).json({ message: 'Error adding product to cart', error });
    }
};

//Update quantity of product in cart
const updateProductInCart = async (req, res) => {
    try {
      const { quantity } = req.body;
      const { productId } = req.params;
      const user = req.user;
  
      if (!user.cart_id) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const cart = await Cart.findById(user.cart_id);
      const product = cart.products.find(item => item.product_id.toString() === productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found in cart' });
      }
  
      // Update the quantity (if quantity is 0, you may choose to remove the product)
      product.quantity = quantity;
      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Error updating product in cart', error });
    }
};

//Remove Specific product from cart
const removeProductFromCart = async (req, res) => {
    try {
      const { productId } = req.params;
      const user = req.user;
  
      if (!user.cart_id) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const cart = await Cart.findById(user.cart_id);
      cart.products = cart.products.filter(item => item.product_id.toString() !== productId);
      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Error removing product from cart', error });
    }
};

//customer clears own cart
const clearMyCart = async (req, res) => {
    try {
      const user = req.user;
      if (!user.cart_id) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      const cart = await Cart.findById(user.cart_id);
      cart.products = [];
      cart.appliedCoupon = null;
      await cart.save();
      res.json({ message: 'Cart cleared', cart });
    } catch (error) {
      res.status(500).json({ message: 'Error clearing cart', error });
    }
};

//Apply Coupon to cart
const applyCouponToCart = async (req, res) => {
  try {
    const { couponCode } = req.body;
    if (!couponCode) {
      return res.status(400).json({ message: 'Coupon code is required' });
    }

    // Find the coupon by its code and ensure it is active.
    const coupon = await Coupon.findOne({ code: couponCode, is_active: true });
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found or inactive' });
    }

    // Check if coupon has expired.
    if (coupon.expiration_date < new Date()) {
      return res.status(400).json({ message: 'Coupon has expired' });
    }


    const user = req.user;
    let cart;
    if (!user.cart_id) {
      cart = new Cart({ products: [] });
      await cart.save();
      user.cart_id = cart._id;
      await user.save();
    } else {
      cart = await Cart.findById(user.cart_id);
    }

    cart.appliedCoupon = coupon._id;
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error applying coupon', error });
  }
};

//Remove applied coupon from cart
const removeCouponFromCart = async (req, res) => {
  try {
    const user = req.user;
    if (!user.cart_id) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const cart = await Cart.findById(user.cart_id);
    cart.appliedCoupon = null;
    await cart.save();
    res.status(200).json({ message: 'Coupon removed successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error removing coupon', error });
  }
};

//GETALL cart
const getAllCarts = async (req, res) => {
    try {
      const carts = await Cart.find().populate('products.product_id products.seller_id');
      res.json(carts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching carts', error });
    }
};

//GET cart for specific customer
const getCartByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user || !user.cart_id) {
        return res.status(404).json({ message: 'User or cart not found' });
      }
      const cart = await Cart.findById(user.cart_id).populate('products.product_id products.seller_id');
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user cart', error });
    }
};

//Update specific Customer's cart
const updateCartByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const { products } = req.body; // expect an array of products
      const user = await User.findById(userId);
      if (!user || !user.cart_id) {
        return res.status(404).json({ message: 'User or cart not found' });
      }
      const cart = await Cart.findByIdAndUpdate(
        user.cart_id,
        { products },
        { new: true }
      );
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user cart', error });
    }
};

//Delete Specific customer's cart
const deleteCartByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user || !user.cart_id) {
        return res.status(404).json({ message: 'User or cart not found' });
      }
      await Cart.findByIdAndDelete(user.cart_id);
      user.cart_id = null;
      await user.save();
      res.json({ message: 'Cart deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting cart', error });
    }
};

module.exports = {getMyCart, addProductToCart, updateProductInCart, removeProductFromCart,clearMyCart, applyCouponToCart, removeCouponFromCart, getAllCarts,getCartByUserId,updateCartByUserId,deleteCartByUserId}