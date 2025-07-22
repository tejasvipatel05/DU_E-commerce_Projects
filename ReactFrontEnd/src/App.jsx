import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './custom.css';
import './navbarStyle.css';
import GetAllCategory from './Components/GetAllCategory'
import '../style.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Layout from "./layout"
import LoginForm from './Login'
import RegistrationForm from './Registration'
import AllProduct from './Components/ViewProducts';
import ViewCart from './Components/ViewCart';
import Cart from './Components/cart';
import Wishlist from './Components/Wishlist';
import Checkout from './Components/Checkout';
import OrderSuccess from './Components/OrderSuccess';
import OrderHistory from './Components/OrderHistory';
import ProductDetails from './Components/ProductDetails';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/product' element={<AllProduct />}></Route>
            <Route path='/product/:id' element={<AllProduct />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/wishlist' element={<Wishlist />}></Route>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Route>
          <Route path='/signup' element={<RegistrationForm />}></Route>
          <Route path='/login' element={<LoginForm />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
