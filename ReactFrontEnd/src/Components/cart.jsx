import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      
      const response = await fetch("http://localhost:1005/cart/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        // credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch cart.");
      }

      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error.message);
      setError("Failed to fetch cart.");
    } finally {
      setLoading(false);
    }
  };
  

  const updateCart = async (productId, newQuantity) => {
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch(`http://localhost:1005/cart/me/products/${productId}`, {
        method: "PUT", // Use PUT to update quantity
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }), // Send updated quantity
      });
  
      if (!response.ok) {
        throw new Error("Failed to update cart");
      }
  
      // const updatedCart = await response.json();
      // setCart(updatedCart); // Update cart in state
      await fetchCart();

    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };
  
  // Function to increase quantity
  const increaseQuantity = (productId, currentQuantity) => {
    updateCart(productId, currentQuantity + 1);
  };
  
  // Function to decrease quantity
  const decreaseQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateCart(productId, currentQuantity - 1);
    } else {
      removeItem(productId); // Remove if quantity is 1
    }
  };
  
  // Function to remove item (set quantity to 0)
  // const removeItem = (productId) => {
  //   updateCart(productId, 0);
  // };

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }
  
      const response = await fetch(`http://localhost:1005/cart/me/products/${productId}`, {
        method: "DELETE", // Use DELETE method to remove item
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }
  
      // Refresh the cart after removal
      await fetchCart();
    } catch (error) {
      console.error("Error removing item from cart:", error.message);
    }
  };
  

  // Calculate total amount
  const totalAmount = cart?.products.reduce(
    (total, item) => total + item.product_id.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout", { state: { cart } }); // Send cart data to Checkout page
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart || !cart.products?.length) return (
    <StyledWrapper>
        <p>Cart Empty</p>
        <div className="cart-container text-center p-5">
            <svg width="150" height="150"><use xlinkHref="#shopping-bag"></use></svg>
            <h5 className="mt-3 text-muted">Your cart is empty!</h5>
            <Link to="/product" className="btn btn-primary mt-2">Go to Shop</Link>
        </div>
    </StyledWrapper>
);

return (
  <StyledWrapper>
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.products.map((item) => (
        <div key={item.product_id._id} className="cart-item">
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
          <div className="quantity">
            <button onClick={() => decreaseQuantity(item.product_id._id, item.quantity)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQuantity(item.product_id._id, item.quantity)}>+</button>
          </div>
          <button className="remove-btn" onClick={() => removeItem(item.product_id._id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ₹{totalAmount.toFixed(2)}</h3>
      <div className="checkout-container">
        <button className="checkout-btn" onClick={() =>handleCheckout()}>Proceed to Checkout</button>
      </div>
    </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background-color: #fefcff;
//   min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  .cart-container {
    width: 100%;
    height: 100%;
    background: #fefcff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .cart-item {
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

  .cart-item:hover {
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

  .price {
    color: #2c1a33;
    font-weight: bold;
  }

  .original-price {
    text-decoration: line-through;
    color: grey;
    margin-right: 8px;
  }

  .quantity {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .quantity button {
    background: #CFB5d6;
    color: #fff;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s;
  }

  .quantity button:hover {
    background: #2c1a33;
  }

  .remove-btn {
    background: #2c1a33;
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

  .checkout-container {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
  }

  .checkout-btn {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #2c1a33;
    color: #fff;
    border: none;
    padding: 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
    font-size: 1rem;
  }

  .checkout-btn:hover {
    background: #1d1023;
    transform: scale(1.05);
  }
    .error-message {
    color: red;
    background: #ffe0e0;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
}

  `;

export default Cart;
