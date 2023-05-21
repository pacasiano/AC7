import React from "react";
import Header from "./header";
import Footer from "./footer";
import Main from "./pages/main";
import Store from "./pages/store";
import About from "./pages/about";
import Cart from "./pages/cart";
import './App.css';

function App() {

  let component
  switch (window.location.pathname) {
    case "/":
      component = <Main />
      break
    case "/Store":
      component = <Store />
      break
    case "/About":
      component = <About />
      break
    case "/Cart":
      component = <Cart />
      break
    default: component = <Main />
    }


  return (

    <div className="App">
      <Header />
      {component}
      <Footer />
    </div>

  );
}

export default App;
