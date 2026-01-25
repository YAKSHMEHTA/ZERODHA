import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import About from './landing_page/about/AboutPage'
import { CookiesProvider } from 'react-cookie';
import Product from './landing_page/products/Universe'
import Support from './landing_page/support/SupportPage'
import Notfound from './landing_page/Notfound';
import HomePage from './landing_page/home/HomePage';
import Login from './Auth/Login';
import Signup from './Auth/Signup';

import PricingPage from './landing_page/products/ProductPage';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route path="/about" element={<About/>}></Route>
      <Route path="/product" element={<Product/>}></Route>
      <Route path="/pricing" element={<PricingPage/>}></Route>
      <Route path="/support" element={<Support></Support>}></Route>
      <Route path="/Signup" element={<Signup></Signup>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path='*' element={<Notfound></Notfound>}></Route>
    </Routes>
  </BrowserRouter>
  </CookiesProvider>
);