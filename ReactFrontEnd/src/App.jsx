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


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path='/signup' element={<RegistrationForm />}></Route>
          <Route path='/login' element={<LoginForm />}></Route>
          <Route path='/product' element={<AllProduct/>}></Route>
          <Route path='/product/:id' element={<AllProduct/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
