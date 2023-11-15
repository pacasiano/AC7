import React, {useState, useEffect} from "react";
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
import Profile from "./pages/yourProfile";
import OrderConfirmation from "./components/orderConfirmation";
import InventoryInConfirmation from "./components/inventoryInConfirmation";
import Signup2 from "./pages/sign-up2";
import Error404 from "./pages/Error404";
import './App.css';

function App() {
  //Get cookie
  const cookie = document.cookie;

  function getAcctIdFromCookie(cookieStr) {
    if (cookieStr.indexOf(';') > 0) {
      const cookiesArray = cookieStr.split(';');
      for (let i = 0; i < cookiesArray.length; i++) {
        if (cookiesArray[i].indexOf('account_id') > 0) {
          const id = cookiesArray[i].replace('account_id=', '').trim();
          return id;
        }
      }
    } else {
      const id = cookie.slice(cookie.indexOf('=') + 1);
      return id;
    }
  }

  const accountId = getAcctIdFromCookie(cookie);

  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(`/api/account/${accountId}`)
      .then((res) => res.json())
      .then((user) => {
        setUser(user);
      });
  }, []);

  const {account_type} = user[0] || {};
  console.log(account_type + " Account type")

  return (
    <>
      {account_type === "customer" ? (
        // If user account
        <>
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
              <Route path="checkout" element={<Checkout />} />
              <Route path="order" element={<IndivOrder />} />
              <Route path="user/profile" element={<Profile />} />
            </Route>
            <Route path="order/confirmation" element={<OrderConfirmation />} />
            {/* Add a wildcard route for unmatched paths */}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </>
      ) : account_type === "employee" ? (
        // If admin account
        <Routes>
          <Route index element={<Admin />} />
          <Route path="admin" element={<Admin />} />
          <Route path="inventory-in/confirmation" element={<InventoryInConfirmation />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      ) : (
        // If neither user nor admin (for simplicity assuming it's the login page)
        <Routes>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="sign-up/account-information" element={<Signup2 />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      )}
    </>
  );
}

export default App;
