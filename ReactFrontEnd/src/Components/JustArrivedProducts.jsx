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
        {products.map((product) => (
          <div key={product._id} className="col-md-4">
            <div className="card">
              <img src={product.product_img} alt={product.product_name} className="card-img-top" />
              <div className="card-body">
                <h5>{product.product_name}</h5>
                <p>Price: ${product.final_price}</p>
                <button className="btn btn-primary">View Product</button>
              </div>
            </div>
          </div>
        ))}
      </div>
  );
};

export default NewArrivals;
