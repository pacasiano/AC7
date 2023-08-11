import {Routes, Route} from "react-router-dom";
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

import './App.css';

function App() {

  return (
    <div>
      <Header />
        <div className="h-12"></div>
        <Routes>
          {/* Default Route */}
          <Route element={<Main />} />

          <Route path="/" element={<Main />} />
          <Route path="/home" element={<Main />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/product" element={<Product />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      <Footer />
    </div>
  );

}

export default App;
