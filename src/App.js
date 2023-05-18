import React from "react";
import Header from "./header";
import Footer from "./footer";
import Main from "./pages/main";
import About from "./pages/about";
import Store from "./pages/store";
import './App.css';

function App() {

  let component = <Main />
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
