import React, { useEffect, useState } from "react";

const PopularProducts = () => {
    const [products, setProducts] = useState([]);    

    useEffect(() => {
        fetch("http://localhost:1005/product/popular") // Fetch from backend
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(error => console.error("Error fetching popular products:", error));
    }, []);

    return (
        <div className="row">
            {products.length > 0 ? (
                products.map(product => (
                    <div key={product._id} className="col-md-4 col-lg-3 mb-4">
                        <div className="card shadow-sm h-100">
                            <img src={product.product_img} className="card-img-top" alt={product.product_name} style={{ height: "200px", objectFit: "cover" }} />
                            <div className="card-body text-center">
                                <h5 className="card-title">{product.product_name}</h5>
                                <p className="card-text text-muted">{product.category_name}</p>
                                <p className="fw-bold">${product.price}</p>
                                <p className="text-warning">
                                    ⭐ {product.averageRating.toFixed(1)} ({product.reviewCount} reviews)
                                </p>
                                <button className="btn btn-primary w-100">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center">No popular products found.</p>
            )}
        </div>
    );
};

export default PopularProducts;
