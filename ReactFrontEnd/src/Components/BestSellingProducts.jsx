import React, { useEffect, useState } from "react";

const BestSellingProducts = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const productUrl = "http://localhost:1005/product/best-sellers"; // API URL

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

  return (
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
                  <p className="fw-bold text-primary">
                    ${product.final_price}{" "}
                    {product.discount_value > 0 && (
                      <span className="text-muted text-decoration-line-through">
                        ${product.original_price}
                      </span>
                    )}
                  </p>
                  <button className="btn btn-outline-primary w-100">Add to Cart</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No best-selling products found.</p>
        )}
      </div>
  );
};

export default BestSellingProducts;
