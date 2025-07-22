import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await fetch("http://localhost:1005/order/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      console.log(data);
      
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading order history...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!orders.length) return <p>No orders found.</p>;

  return (
    <StyledWrapper>
      <div className="order-container">
        <h2>Your Orders</h2>
        {orders.map((order) => (
          <div key={order._id} className="order-item">
            <div className="order-details">
              <p>Order ID: {order._id}</p>
              <p>Total Price: ₹{order.total_amount}</p>
              <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <Link to={`/order/${order._id}`} className="view-details">View Details</Link>
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

  .order-container {
    width: 100%;
    background: #fefcff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .order-item {
    background: #fff;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .order-details {
    font-size: 1.2rem;
  }

  .view-details {
    display: inline-block;
    margin-top: 10px;
    padding: 8px 12px;
    background: #2c1a33;
    color: #fff;
    border-radius: 5px;
    text-decoration: none;
  }

  .view-details:hover {
    background: #1d1023;
  }
`;

export default OrderHistory;
