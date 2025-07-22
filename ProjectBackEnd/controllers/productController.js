const {Product} = require('../model/Product');
const { Review } = require('../model/Review');
const mongoose = require("mongoose");


const getProducts = async (req, res) => {
  try {
    const { categoryId, discountId, query } = req.query;
    let filter = {};
    
    // Apply filters based on query parameters
    // if (categoryId) filter.category_id = categoryId;
    // if (discountId) filter.discount_id = discountId;
    // if (query) {
    //   filter.$or = [
    //     { product_name: { $regex: query, $options: "i" } },
    //     { description: { $regex: query, $options: "i" } },
    //   ];
    // }
    
    
    
    // Fetch products based on filters
    const products = await Product.find(filter)
    .populate(  "category_id" )
    .populate(  "discount_id" )
    .populate( "seller_id" ); // Adjust based on your schema
    
    console.log(products[0].category_id);
    console.log("Products====",products);
    // Process products for discount calculation and reviews
    const processedProducts = await Promise.all(
      products.map(async (product) => {
        // Calculate Discount
        const discountValue = product.discount_id ? product.discount_id.value : 0;
        const finalPrice = product.price;

        // Fetch Review Data
        const feedback = await Review.aggregate([
          { $match: { product_id: product._id } },
          {
            $group: {
              _id: "$product_id",
              averageRating: { $avg: "$rating" },
              totalRatings: { $sum: 1 },
            },
          },
        ]);

        return {
          _id: product._id,
          product_name: product.product_name,
          product_img: product.product_img,
          category_name: product.category_id.category_name,
          category_id: product.category_id._id,
          seller_id: product.seller_id,
          original_price: product.product_price,
          discount_value: discountValue,
          final_price: finalPrice,
          product_stock: product.product_stock,
          average_rating: feedback.length > 0 ? feedback[0].averageRating.toFixed(1) : "0.0",
          total_ratings: feedback.length > 0 ? feedback[0].totalRatings : 0,
          created_at: product.created_at,
        };
      })
    );

    res.json(processedProducts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

//GET all products
// const getProducts = async (req, res) => {
//     try {
//       const products = await Product.find().populate('category_id discount_id seller_id');
//       res.json(products);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching products', error });
//     }
// };

const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params; // Now correctly extracting categoryId
    console.log("PARAMS:  ",req.params);
    
    console.log("Received categoryId from request:", categoryId);

    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    const filteredProducts = await Product.find({ category_id: categoryId }).populate("category_id");
    console.log("Filtered Products:", filteredProducts);

    res.json(filteredProducts);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Error fetching products by category", error });
  }
};


// Route: GET /product/best-sellers
// const getBestSellingProducts = async (req, res) => {
//   try {
//       const bestSellers = await Product.aggregate([
//           {
//               $lookup: {
//                   from: "orders", // Match orders collection
//                   localField: "_id",
//                   foreignField: "products.product_id",
//                   as: "orderData"
//               }
//           },
//           {
//               $addFields: {
//                   totalSales: { $size: "$orderData" } // Count number of times sold
//               }
//           },
//           { $sort: { totalSales: -1 } }, // Sort by highest sales
//           { $limit: 5 } // Limit results to top 10
//       ]);

//       res.json(bestSellers);
//   } catch (error) {
//       res.status(500).json({ message: "Error fetching best-selling products", error });
//   }
// };

const getBestSellingProducts = async (req, res) => {
  try {
    const bestSellers = await Product.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "products.product_id",
          as: "orderData"
        }
      },
      {
        $addFields: {
          totalSales: { $size: "$orderData" }
        }
      },
      { $sort: { totalSales: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "discounts",
          localField: "discount_id",
          foreignField: "_id",
          as: "discountData"
        }
      },
      {
        $addFields: {
          discountDetails: { $first: "$discountData" } // Extract first discount object
        }
      },
      {
        $project: {
          discountData: 0,
          orderData: 0
        }
      }
    ]);

    // console.log("Best Sellers Response:", JSON.stringify(bestSellers, null, 2)); // Debug output
    res.json(bestSellers);
  } catch (error) {
    console.error("Error fetching best-selling products:", error);
    res.status(500).json({ message: "Error fetching best-selling products", error });
  }
};


const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await Product.find({ sales_count: { $gt: 0 } }) // Get products with sales
      .sort({ sales_count: -1 }) // Sort by highest sales first
      .limit(10);

    // If no products have sales, fallback to newest arrivals
    if (featuredProducts.length === 0) {
      featuredProducts = await Product.find()
        .sort({ createdAt: -1 }) // Sort by newest first
        .limit(10);
    }

    res.json(featuredProducts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching featured products", error });
  }
};


//GET Product by id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).populate('category_id discount_id seller_id');

    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Calculate Discount
    const discountValue = product.discount_id ? product.discount_id.value : 0;
    const finalPrice = product.product_price;

    res.json({
      product,
      original_price: product.product_price,
      discount_value: discountValue,
      final_price: finalPrice,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

const getPopularProducts = async (req, res) => {
  try {
    const products = await Product.find().lean(); // Fetch all products

    // Compute averageRating and reviewCount dynamically
    const popularProducts = products.map(product => {
      const totalReviews = product.reviews ? product.reviews.length : 0;
      const totalRating = totalReviews > 0 
        ? product.reviews.reduce((sum, review) => sum + review.rating, 0) 
        : 0;
      
      const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

      return {
        ...product,  // Keep existing product data
        averageRating, // Calculated rating
        reviewCount: totalReviews // Number of reviews
      };
    });

    // Sort by `averageRating` first, then `reviewCount` if ratings are equal
    popularProducts.sort((a, b) => {
      if (b.averageRating !== a.averageRating) {
        return b.averageRating - a.averageRating; // Highest rating first
      }
      return b.reviewCount - a.reviewCount; // If same rating, sort by review count
    });

    res.json(popularProducts.slice(0, 10)); // Return top 10 popular products
  } catch (error) {
    res.status(500).json({ message: "Error fetching popular products", error });
  }
};

  const getJustArrivedProducts = async (req, res) => {
    try {
      const products = await Product.find()
        .sort({ createdAt: -1 }) // Sort by newest first
        .limit(5); // Limit the number of products

      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Error fetching new arrivals", error });
    }
  };



//GET product by category
// const getProductsByCategory = async (req, res) => {
//     try {
//       const products = await Product.find({ category_id: req.params.categoryId }).populate('category_id discount_id seller_id');
//       res.json(products);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching products by category', error });
//     }
// };

//GET product by discount
// const getProductsByDiscount = async (req, res) => {
//     try {
//       const products = await Product.find({ discount_id: req.params.discountId }).populate('category_id discount_id seller_id');
//       res.json(products);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching products by discount', error });
//     }
// };

// Seach Product
const searchProducts = async (req, res) => {
  try {
    const { query } = req.query; // ✅ Correctly extract search term

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const products = await Product.find({
      $or: [
        { product_name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }).populate("category_id discount_id seller_id");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error searching products", error });
  }
};

//POST Product
const createProduct = async (req, res) => {
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
const updateProduct = async (req, res) => {
    try {
      const product = await Product.findOne({ _id: req.params.id});
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
const deleteProduct = async (req, res) => {
    try {
      const product = await Product.findOne({ _id: req.params.id });
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
const getProductsBySeller = async (req, res) => {
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

module.exports = {getProducts, getProductsByCategory, searchProducts, getBestSellingProducts, getFeaturedProducts, getProductById, getPopularProducts, getJustArrivedProducts, createProduct, updateProduct, deleteProduct, getProductsBySeller}