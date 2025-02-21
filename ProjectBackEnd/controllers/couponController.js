const {Coupon} = require('../model/Coupon');

//GET all Coupons
exports.getAllCoupons = async (req, res) => {
    // try {
    //   let query = {};
    //   console.log(req.user);
      
    //   // For customers and sellers, only show active and non-expired coupons.
    //   if (req.user.role === 'customer' || req.user.role === 'seller') {
    //     query = { 
    //       is_active: true, 
    //       expiration_date: { $gt: new Date() } 
    //     };
    //   }
    //   console.log(query);
      
    //   const coupons = await Coupon.find({query});
    //   res.json(coupons);
    // } catch (error) {
    //   res.status(500).json({ message: 'Error fetching coupons', error });
    // }
    try {
      const coupons = await Coupon.find();
      if (!coupons) {
          res.status(404).json({ message: "Coupon not found" });
      }
      res.status(200).json(coupons);
  } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const getAllCoupon = async (req, res) => {
  
}

//Get Coupon By ID
exports.getCouponById = async (req, res) => {
    try {
      const coupon = await Coupon.findById(req.params.id);
      if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
      res.json(coupon);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching coupon', error });
    }
};

//Create New Coupon
exports.createCoupon = async (req, res) => {
    try {
      const { code, discount_type, value, expiration_date, is_active, minimum_purchase, max_usage } = req.body;
      const newCoupon = new Coupon({
        code,
        discount_type,
        value,
        expiration_date,
        is_active,
        minimum_purchase,
        max_usage
      });
      await newCoupon.save();
      res.status(201).json(newCoupon);
    } catch (error) {
      res.status(500).json({ message: 'Error creating coupon', error });
    }
};

//Update Coupon
exports.updateCoupon = async (req, res) => {
    try {
      const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedCoupon) return res.status(404).json({ message: 'Coupon not found' });
      res.json(updatedCoupon);
    } catch (error) {
      res.status(500).json({ message: 'Error updating coupon', error });
    }
};

//Delete Coupon
exports.deleteCoupon = async (req, res) => {
    try {
      const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
      if (!deletedCoupon) return res.status(404).json({ message: 'Coupon not found' });
      res.json({ message: 'Coupon deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting coupon', error });
    }
};

