import { useLocation, useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const AllProduct = () => {
  const productUrl = "http://localhost:1005/product"; // Base API URL
  const cartUrl = "http://localhost:1005/cart/me/products"
  const { id: categoryId } = useParams(); // Get category ID from URL
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem("token");
  console.log(products);

  // Fetch all products
  const getAllProducts = () => {
    fetch(productUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => setProducts(res))
      .catch((error) => console.error("Error fetching all products:", error));
  };

  // Fetch products by category from API
  const getProductsByCategory = () => {
    fetch(`${productUrl}/category/${categoryId}`, {  // ✅ Correct API URL
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => setProducts(res))
      .catch((error) => console.error("Error fetching products by category:", error));
  };

  // Fetch products by search query
  // const searchProducts = () => {
  //   fetch(`${productUrl}?product_name=${searchQuery}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => setProducts(res))
  //     .catch((error) => console.error("Error searching products:", error));
  // };

  // Decide which API call to use
  useEffect(() => {
    if (!token || token === 'undefined') {
      navigate('/login')
    }
    if (categoryId) {
      getProductsByCategory();
    } else {
      getAllProducts();
    }
  }, [categoryId]); // ✅ Dependency added to refetch when category changes

  // Function to handle adding product to cart
  // Function to handle adding product to cart
  const addToCart = async (productId, sellerId) => {
    if (!token) {
      alert("User not logged in!");
      return;
    }
    try {
      const response = await fetch(cartUrl, {  // ✅ Correct route
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          seller_id: sellerId,
          quantity: 1, // Default quantity
        }),
      }); 
      
      const data = await response.json();
      console.log("Cart Response:", data);
      
      if (!response.ok) {
        throw new Error(response.message || "Failed to add product to cart");
      }
      
      Swal.fire({
        title: 'Product Added to Cart!',
        text: 'Your item has been added successfully.',
        icon: 'success',
        toast: true,  // Makes it a toast (non-blocking popup)
        position: 'top-end',  // Positions it in the top-right corner
        showConfirmButton: false,  // Hides the confirm button
        timer: 2000,  // Auto-closes after 2 seconds
        timerProgressBar: false,  // Shows a progress bar
        background: '#f9f9f9',  // Light background
        color: '#333',  // Text color
        iconColor: '#4CAF50',  // Green icon color
        showClass: {
          popup: 'animate__animated animate__fadeInRight'  // Animation for showing
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutRight'  // Animation for hiding
        }
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      // alert("Error adding product to cart: " + error.message);
    }
  };

  const isInWishlist = async(id) => {
    return this.wishlistProductIds.includes(id);
  }
  
  const addToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:1005/wishlist/me/products/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product to wishlist");
      }

      alert("Product added to wishlist successfully!");
      fetchWishlist();
    } catch (error) {
      console.error("Error adding product to wishlist:", error.message);
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:1005/wishlist/me/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to remove product from wishlist");
      }
      // Refresh wishlist after removal
      await fetchWishlist();
    } catch (error) {
      console.error("Error removing product from wishlist:", error.message);
    }
  };


  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">{categoryId ? "Category Products" : "All Products"}</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-md-4 col-lg-3 mb-4">
              <div className="card shadow-sm h-100">
                <img
                  src={product.product_img[0]}
                  className="card-img-top"
                  alt={product.product_name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.product_name}</h5>
                  <p className="card-text text-muted">{product.category_name}</p>
                  <p className="fw-bold">₹{product.final_price}</p>
                  <div class="button-area p-3 pt-0">
                    <div class="row g-1 mt-2">
                      {/* <!-- <div class="col-3"><input type="number" name="quantity" class="form-control border-dark-subtle input-number quantity" value="1"></div> --> */}
                      <div class="col-10"><button onClick={() => addToCart(product._id, product.seller_id)} class="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlink:href="#cart"></use></svg> Add to Cart</button></div>
                      {/* <div class="col-2"><a href="#" class="btn rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlink:href="#heart"></use></svg></a></div> */}
                      <div class="col-2">
                        {isInWishlist(product._id) ? <a onClick={() => addToWishlist(product._id)} style={{ cursor: "pointer" }}><span>💜</span></a> : <a onClick={() => removeFromWishlist(product._id)} style={{ cursor: "pointer" }}><span>🤍</span></a>}
                      </div>
                    </div>
                  </div>
                  </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default AllProduct;
