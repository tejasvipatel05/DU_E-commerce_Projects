import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  
const ViewCart = () => {
    const cartUrl = "http://localhost:1005/cart";
    const token = localStorage.getItem("token");
    const [cart, setCart] = useState([]);
    const [id, setId] = useState('');
    const [cartEmpty, setCartEmpty] = useState(false);
    const [error, setError] = useState(""); // State to store error messages
    
    useEffect(() => {
        getAllCartProducts();
    }, []);

    console.log(localStorage.getItem("token"));


// const getAllCartProducts = () => {
//     setError(""); // Reset error before fetching

//     if (!token) {
//         setError("No authentication token found. Please login again.");
//         setCart([]);
//         setCartEmpty(true);
//         return;
//     }

//     fetch(cartUrl, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//         },
//     })
//     .then((res) => {
//         if (res.status === 403) {
//             setError("Unauthorized: Invalid or expired token.");
//             setCart([]);
//             setCartEmpty(true);
//             return null;
//         }
//         if (res.status === 404) {
//             setCartEmpty(true);
//             setCart([]);
//             return null;
//         }
//         if (!res.ok) {
//             setError(`Error ${res.status}: Unable to fetch cart.`);
//             return null;
//         }
//         return res.json();
//     })
//     .then((res) => {
//         if (res && res.products) {
//             setId(res._id || '');
//             setCart(res.products);
//             setCartEmpty(res.products.length === 0);
//         } else {
//             setCart([]);
//             setCartEmpty(true);
//         }
//     })
//     .catch((error) => {
//         setError("Network error. Please try again later.");
//         console.error("Error fetching cart:", error);
//         setCart([]);
//         setCartEmpty(true);
//     });
// };


    // const getAllCartProducts = () => {
    //     console.log(localStorage.getItem("token"));

    
    //     if (!token) {
    //         console.error("No authentication token found.");
    //         setCart([]);
    //         setCartEmpty(true);
    //         return;
    //     }
    
    //     fetch(cartUrl, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`, // ✅ Ensure token is passed correctly
    //         },
    //     })
    //     .then((res) => {
    //         if (res.status === 403) {
    //             console.error("Unauthorized: Invalid or expired token.");
    //             setCart([]);
    //             setCartEmpty(true);
    //             return null;
    //         }
    //         if (res.status === 404) {
    //             setCartEmpty(true);
    //             setCart([]);
    //             return null;
    //         }
    //         return res.json();
    //     })
    //     .then((res) => {
    //         if (res && res.products) {
    //             setId(res._id || '');
    //             setCart(res.products);
    //             setCartEmpty(res.products.length === 0);
    //         } else {
    //             setCart([]);
    //             setCartEmpty(true);
    //         }
    //     })
    //     .catch((error) => {
    //         console.error("Error fetching cart:", error);
    //         setCart([]);
    //         setCartEmpty(true);
    //     });
    // };
    
    // const updateCart = (productId, quantity, stock) => {
    //     if (quantity < 1 || quantity > 10 || quantity > stock) return;

    //     fetch(`${cartUrl}/${id}`, {
    //         method: 'PATCH',
    //         body: JSON.stringify({ productId, quantity }),
    //         headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token }
    //     })
    //         .then(res => res.json())
    //         .then(() => getAllCartProducts()) // Refresh cart
    //         .catch(error => console.error("Error updating cart", error));
    // };

    // const removeProduct = (productId) => {
    //     fetch(cartUrl + "/" + id, {
    //         method: 'DELETE',
    //         body: JSON.stringify({
    //             productId: productId
    //         }),
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + token
    //         }
    //     }).then(res => res.json()).then(res => getAllCartProducts())
    // }

    // const [cartItems, setCartItems] = useState([
    //     {
    //         id: 1,
    //         name: "Lipstick",
    //         image: "images/product-large-4.jpg",
    //         quantity: 1,
    //         originalPrice: 200,
    //         discountedPrice: 150,
    //     },
    //     {
    //         id: 1,
    //         name: "Lipstick",
    //         image: "/path/to/lipstick.jpg",
    //         quantity: 1,
    //         originalPrice: 200,
    //         discountedPrice: 150,
    //     },
    //     {
    //         id: 1,
    //         name: "Lipstick",
    //         image: "/path/to/lipstick.jpg",
    //         quantity: 1,
    //         originalPrice: 200,
    //         discountedPrice: 150,
    //     },
    //     {
    //         id: 2,
    //         name: "Foundation",
    //         image: "/path/to/foundation.jpg",
    //         quantity: 1,
    //         originalPrice: 500,
    //         discountedPrice: 400,
    //     },
    //     {
    //         id: 3,
    //         name: "Eyeliner",
    //         image: "/path/to/eyeliner.jpg",
    //         quantity: 1,
    //         originalPrice: 250,
    //         discountedPrice: 200,
    //     },
    // ]);

    const increaseQuantity = (productId, quantity, stock) => {
        updateCart(productId, quantity + 1, stock);
    };

    const decreaseQuantity = (productId, quantity) => {
        if (quantity > 1) updateCart(productId, quantity - 1);
    };


    const removeItem = (productId) => {
        removeProduct(productId);
    };

    const totalAmount = (cart || []).reduce(
        (sum, item) => sum + (item.discountedPrice * item.quantity || 0),
        0
    );

    return (
        <StyledWrapper>
            <div className="cart-container">
                <h2>Your Cart</h2>
                {cartEmpty ? (
                    <div className="text-center p-5">
                        <svg width="150" height="150"><use xlinkHref="#shopping-bag"></use></svg>
                        <h5 className="mt-3 text-muted">Your cart is empty!</h5>
                        <Link to="/product" className="btn btn-primary mt-2">Go to Shop</Link>
                    </div>
                ) : (
                    cart.map((item) => (
                        <div key={item._id} className="cart-item">
                            <img src={item.image} alt={item.name} className="product-image" />
                            <div className="product-details">
                                <p className="product-name">{item.name}</p>
                                <p>
                                    <span className="original-price">${item.originalPrice.toFixed(2)}</span>
                                    <span className="price">${item.discountedPrice.toFixed(2)}</span>
                                </p>
                            </div>
                            <div className="quantity">
                                <button onClick={() => decreaseQuantity(item._id)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => increaseQuantity(item._id)}>+</button>
                            </div>
                            <button className="remove-btn ms-3" onClick={() => removeItem(item._id)}>
                                Remove
                            </button>
                        </div>
                    ))
                )}
                <h3>Total: ${totalAmount.toFixed(2)}</h3>
                <div className="checkout-container">
                    <button className="checkout-btn">Proceed to Checkout</button>
                </div>
                {error && <p className="error-message">{error}</p>}

            </div>
        </StyledWrapper>
    );
};

export default ViewCart;
