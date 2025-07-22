import { useEffect, useState } from "react";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1005/product/new-arrivals")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching new arrivals:", error));
  }, []);

  return (
    <div className="row">
          {products.length > 0 ? (
          products.map((product) => (
            <div className="col-md-4 col-lg-3 mb-4">
              <div className="card shadow-sm h-100">
                <img
                  src={product.product_img[0]}
                  className="card-img-top"
                  alt={product.product_name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.product_name}</h5>
                  <p className="card-text text-muted">{product.category_name}</p>
                  <p className="fw-bold ">${product.price}</p>
                  <button className="btn btn-primary w-100">Add to Cart</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </div>
  );
};

export default NewArrivals;
