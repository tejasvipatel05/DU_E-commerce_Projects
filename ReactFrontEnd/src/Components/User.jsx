import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found. Redirecting to login...");
          setError("Unauthorized. Please log in.");
          return;
        }
  
        const response = await fetch("http://localhost:1005/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // credentials: "include",
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error fetching user profile");
        }
  
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserProfile();
  }, []);

  
    const logout = () => {
      localStorage.removeItem("token");
      navigate("/login"); // Navigate to login page
    };
  

  if (loading) return <p>Loading user profile...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
      <h2>User Profile</h2>
      {user.profile_picture ? (
        <img src={user.profile_picture} alt="Profile" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
      ) : (
        <p>No Profile Picture</p>
      )}
      <p><strong>Name:</strong> {user.full_name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
      <button className="btn btn-primary w-100" onClick={() => logout()}>Logout</button>
    
    </div>
  );
};

export default UserProfile;
