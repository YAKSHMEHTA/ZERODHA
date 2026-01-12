import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './index.css';
import Signup from './landing_page/signup/Signup'
import '@fortawesome/fontawesome-free/css/all.min.css'
import About from './landing_page/about/AboutPage'
import Product from './landing_page/products/Universe'
import Pricing from './landing_page/home/Pricing';
import Support from './landing_page/support/SupportPage'

import HomePage from './landing_page/home/HomePage';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/about" element={<Signup/>}></Route>
      <Route path="/product" element={<Signup/>}></Route>
      <Route path="/pricing" element={<HomePage></HomePage>}></Route>
      <Route path="/support" element={<HomePage></HomePage>}></Route>
    </Routes>
  </BrowserRouter>
);

