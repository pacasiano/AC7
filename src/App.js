import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
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
import IndivOrder from "./components/indivOrder";
import Settings from "./pages/settings";
import OrderConfirmation from "./components/orderConfirmation";
import InventoryInConfirmation from "./components/inventoryInConfirmation";
import './App.css';

function App() {
  return (
    <Routes>
      <Route
        element={
          <div>
            <Header />
            <Outlet />
            <Footer />
          </div>
        }
      >
        <Route index element={<Main />} />
        <Route path="home" element={<Main />} />
        <Route path="store" element={<Store />} />
        <Route path="about" element={<About />} />
        <Route path="cart" element={<Cart />} />
        <Route path="orders" element={<Orders />} />
        <Route path="product" element={<Product />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order" element={<IndivOrder />} />
        <Route path="user/settings" element={<Settings />} />
      </Route>
      <Route path="admin" element={<Admin />} />
      <Route path="order/confirmation" element={<OrderConfirmation/>} />
      <Route path="inventory-in/confirmation" element={<InventoryInConfirmation/>} />
    </Routes>
  );
}

export default App;
