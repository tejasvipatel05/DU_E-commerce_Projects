import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AllProduct = () => {
  const productUrl = "http://localhost:1005/product"; // Base API URL
  const { id: categoryId } = useParams(); // Get category ID from URL
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

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

  useEffect(() => {
    if (categoryId) {
      getProductsByCategory();
    } else {
      getAllProducts();
    }
  }, [categoryId]); // ✅ Dependency added to refetch when category changes

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">{categoryId ? "Category Products" : "All Products"}</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
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
                  <p className="fw-bold text-primary">${product.final_price}</p>
                  <button className="btn btn-outline-primary w-100">Add to Cart</button>
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
