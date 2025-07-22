import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

const BestSellingProducts = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const productUrl = "http://localhost:1005/product/best-sellers"; // API URL
  const cartUrl = "http://localhost:1005/cart/me/products"
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(productUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setBestSellers(data))
      .catch((error) => console.error("Error fetching best-selling products:", error));
  }, []);

  
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
    <StyledWrapper>
      <div className="row">
        {bestSellers.length > 0 ? (
          bestSellers.map((product) => (
            <div key={product._id} className="col-md-4 col-lg-3 mb-4">
              <div className="card shadow-sm h-100">
                <img
                  src={product.product_img}
                  className="card-img-top"
                  alt={product.product_name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.product_name}</h5>
                  <p className="card-text text-muted">{product.category_name}</p>
                  <p className="fw-bold ">
                    ₹{product.price}{" "}
                    {product.discount_value > 0 && (
                      <span className="text-muted text-decoration-line-through">
                        ${product.original_price}
                      </span>
                    )}
                  </p>
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
                  {/* <button className="btn btn-primary w-100" onClick={() => addToCart(product._id, product.seller_id)}>Add to Cart</button> */}
                  {/* <div class="col-2"><a href="#" class="btn rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlink:href="#heart"></use></svg></a></div> */}
                  {/* <button className="btn btn-primary w-100">Add to Cart</button> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No best-selling products found.</p>
        )}
      </div>
    </StyledWrapper >
  );
};


const StyledWrapper = styled.div`
.best-sellers-container {
    text-align: center;
    padding: 20px;
  }
  
  .product-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    grid-template-columns: repeat(auto-fit, minmax(500px, 2fr));
    gap: 20px;
  }


.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.product-card {
    border: 1px solid #ccc;
    padding: 10px;
    width: 300px;
    text-align: center;
    border-radius: 8px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .product-card img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }

  .rating svg {
    fill: #cfb5d6;
  }
  
  .button-area {
    padding-top: 0;
  }
  
  .input-number {
    width: 50px;
    text-align: center;
  }
  
  .btn-cart {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  
  @media (max-width: 768px) {
    .product-grid {
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }
  }
  
  @media (max-width: 480px) {
    .product-grid {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
  }
  
  .discount {
    color: red;
    font-weight: bold;
  }
`;

export default BestSellingProducts;
