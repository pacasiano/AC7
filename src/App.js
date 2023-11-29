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
import InventoryOutConfirmation from "./components/inventoryOutConfirmation";
import Signup2 from "./pages/sign-up2";
import Error404 from "./pages/Error404";
import './App.css';

function App() {
  //Get cookie
  const accountId = document.cookie
  .split("; ")
  .find((row) => row.startsWith("account_id="))
  ?.split("=")[1];

  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(`/api/account/${accountId}`)
      .then((res) => res.json())
      .then((user) => {
        setUser(user);
      });
  }, [accountId]);

  const {account_type} = user[0] || {};
  console.log(account_type + " Account type")

  //Check if alpha acc exists, if not, we create it
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response1 = await fetch('/api/account/get/alpha');
            const data1 = await response1.json();

            if (data1.message !== 'exists') {
                const response2 = await fetch('/api/account', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: 'alpha',
                        password: '123',
                        account_type: 'employee'
                    })
                });
                const data2 = await response2.json();

                if (data2.message === 'good') {
                    const response3 = await fetch('/api/employee', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: 'alpha',
                            first_name: 'Alpha',
                            middle_name: '',
                            last_name: 'Employee',
                            position: 'Big Boss',
                            contact_info: '000-0000'
                        })
                    });
                    const data3 = await response3.json();
                    console.log(data3.message);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    fetchData();
}, []);

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
              <Route path="product/:product_id" element={<Product />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="orders/:sale_id" element={<IndivOrder />} />
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
          <Route path="inventory-out/confirmation" element={<InventoryOutConfirmation />} />
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
