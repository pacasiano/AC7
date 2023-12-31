import { Routes, Route } from "react-router-dom";
import React from "react";
import Main from "./pages/main";
import Store from "./pages/store";
import About from "./pages/about";
import Cart from "./pages/cart";
import Product from "./pages/product";
import Signup from "./pages/sign-up";
import Login from "./pages/login";
import Orders from "./pages/orders";
import Header from "./components/header";
import Footer from "./components/footer";
import Checkout from "./pages/checkout";
import Admin from "./pages/admin";
import IndivOrder from "./components/indivOrder"

import './App.css';

function App() {
  const path = window.location.pathname;

  return (
    <div>
      {path === "/AC7/admin" || path === "/AC7/login" || path === "/AC7/signup" || path === "/AC7" ? (
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/admin" element={<Admin />} />
        </Routes>
      ) : (
        <div>
          <Header />
          <div className="h-12"></div>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/home" element={<Main />} />
            <Route path="/store" element={<Store />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/product" element={<Product />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order" element={<IndivOrder />} />
          </Routes>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
