import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const OrderSuccess = () => {
  return (
    <StyledWrapper>
      <div className="success-container">
        <h2>🎉 Order Placed Successfully! 🎉</h2>
        <p>Thank you for shopping with us.</p>
        <Link to="/product" className="continue-shopping">Continue Shopping</Link>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .success-container {
    text-align: center;
    background: #fff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .continue-shopping {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: #2c1a33;
    color: #fff;
    text-decoration: none;
    border-radius: 6px;
  }

  .continue-shopping:hover {
    background: #1d1023;
  }
`;

export default OrderSuccess;
