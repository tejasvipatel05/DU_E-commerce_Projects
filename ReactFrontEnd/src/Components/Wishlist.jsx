import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Fetch wishlist for the logged in user
  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await fetch("http://localhost:1005/wishlist/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch wishlist.");
      }

      const data = await response.json();
      setWishlist(data);
    } catch (error) {
      console.error("Error fetching wishlist:", error.message);
      setError("Failed to fetch wishlist.");
    } finally {
      setLoading(false);
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

//   const addToWishlist = async (productId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`http://localhost:1005/wishlist/me/products/${productId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: productId,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to add product to wishlist");
//       }

//       alert("Product added to wishlist successfully!");
//       fetchWishlist();
//     } catch (error) {
//       console.error("Error adding product to wishlist:", error.message);
//     }
//   };

  // Function to handle adding product to cart
  const addToCart = async (productId, sellerId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("User not logged in!");
      return;
    }

    try {
      console.log("productidddd=====",productId);
      
      const response = await fetch(`http://localhost:1005/cart/me/products`, {  // ✅ Correct route
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

      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      // alert("Error adding product to cart: " + error.message);
    }
  };

  if (loading) return <p>Loading wishlist...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!wishlist || !wishlist.products?.length)
    return (
      <StyledWrapper>
        {/* <p>Wishlist is empty</p> */}
        <div className="wishlist-container text-center p-5">
          <svg width="150" height="150">
            <use xlinkHref="#heart-icon"></use>
          </svg>
          <h5 className="mt-3 text-muted">Your wishlist is empty!</h5>
          <Link to="/product" className="btn btn-primary mt-2">
            Go to Shop
          </Link>
        </div>
      </StyledWrapper>
    );

  return (
    <StyledWrapper>
      <div className="wishlist-container">
        <h2>Your Wishlist</h2>
        {wishlist.products.map((item) => (
          <div key={item.product_id._id} className="wishlist-item">
            <img
              src={item.product_id.product_img}
              alt={item.product_id.product_name}
              className="product-image"
            />
            <div className="product-details">
              <p className="product-name">{item.product_id.product_name}</p>
              <p>
                <span>₹{item.product_id.price}</span>
              </p>
            </div>
            <div className="actions">
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(item.product_id._id, item.product_id.seller_id)}
              >
                Add to Cart
              </button>
              <button
                className="remove-btn"
                onClick={() => removeFromWishlist(item.product_id._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background-color: #fefcff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  .wishlist-container {
    width: 100%;
    height: 100%;
    background: #fefcff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .wishlist-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
  }

  .wishlist-item:hover {
    transform: scale(1.02);
  }

  .product-image {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
  }

  .product-details {
    flex-grow: 1;
    padding: 0 1rem;
  }

  .product-name {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
  }

  .add-to-cart-btn {
    background: #2c1a33;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s;
  }

  .add-to-cart-btn:hover {
    background: #1d1023;
  }

  .remove-btn {
    background: #cfb5d6;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s;
  }

  .remove-btn:hover {
    background: darkred;
  }
`;

export default Wishlist;
