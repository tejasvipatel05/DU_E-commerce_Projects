import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || { products: [] };

  const [shippingDetails, setShippingDetails] = useState({
    address: "",
    city: "",
    postalCode: "",
  });

  const getTotalAmount =() => {
    return cart.products.reduce((total, item) => total + item.product_id.price * item.quantity, 0);
  }

  const handleChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    console.log("cart:",cart);
    
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(`http://localhost:1005/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shippingDetails:shippingDetails,
          cart: cart,
          getTotalAmount:getTotalAmount()
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      navigate("/order-success"); // Redirect to Order Success page
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <StyledWrapper>
      <div className="checkout-container">
        <h2>Shipping Details</h2>
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" onChange={handleChange} required />
        <input type="text" name="zip" placeholder="ZIP Code" onChange={handleChange} required />

        <h3>Order Summary</h3>
        {cart.products.map((item) => (
          <div key={item.product_id._id} className="order-item">
            <p>{item.product_id.product_name} - {item.quantity} x ₹{item.product_id.price}</p>
          </div>
        ))}
        <h3>Total: ₹{cart.products.reduce((total, item) => total + item.product_id.price * item.quantity, 0)}</h3>

        <button className="place-order-btn" onClick={placeOrder}>Place Order</button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;

  .checkout-container {
    width: 50%;
    background: #fefcff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  input {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .order-item {
    text-align: left;
    margin: 10px 0;
  }

  .place-order-btn {
    background: #2c1a33;
    color: #fff;
    border: none;
    padding: 1rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s;
  }

  .place-order-btn:hover {
    background: darkgreen;
  }
`;

export default Checkout;
