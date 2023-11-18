import React, { useState, useEffect } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import CODLogo from "../imgs/CODLogo.png";
import gcashLogo from "../imgs/gcashLogo.png";
import CartItem from "../components/cartItem";

function Cart() {

  //GET ACCOUNT_ID COOKIE
  const cookie = document.cookie;
  function getAcctIdFromCookie (cookieStr) {
    //if browser has more than one cookie, the if statement will run
    if (cookieStr.indexOf(';') > 0) {
        //document.cookie is a string. We use .split() to convert it to an array with each cookie being an element
        const cookiesArray = cookieStr.split(';');
        for(let i = 0; i < cookiesArray.length; i++) {
            if (cookiesArray[i].indexOf('account_id') > 0) {
                //find the cookie with 'account_id' substring
                const id = cookiesArray[i].replace('account_id=', '').trim();
                // console.log(id)
                return id;
            }
        }
    }
    else {
        const id = cookie.slice(cookie.indexOf('=')+1);
        // console.log(id)
        return id;
    }
  }

  const [emptyCart, setEmptyCart] = useState(false);

  function submitOrder() {
    if (items.length === 0) {
      setEmptyCart(true);
      setTimeout(() => {
        setEmptyCart(false);
      }, 2000);
    }else {
      window.location.href = "/AC7/checkout";
    }
  }
  

  const accountId = getAcctIdFromCookie(cookie);

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`/api/cart/${accountId}`)
      .then((res) => res.json())
      .then((items) => {
        setItems(items);
      });
  }, []);

  let orderSubtotal = 0;
  items.forEach((item) => {
    orderSubtotal += parseFloat(item.price) * item.quantity;
  })

  return (
    <div className="Cart h-screen pt-16">
      <div className="flex flex-col lg:flex-row lg:items-start items-center lg:gap-0 gap-5 justify-evenly py-16">
        <div className="flex flex-col lg:w-1/2 w-11/12 gap-5 ">
          <div className="bg-gray-100 p-5">
            <div className="flex flex-row justify-start pb-4 text-xl font-semibold">
              Item Summary
            </div>
            <div className="">
              <table class="table-fixed w-full">
                <thead>
                  <tr>
                    <th className="text-xl font-normal">Item</th>
                    <th className="text-xl font-normal">Price</th>
                    <th className="text-xl font-normal">Quantity</th>
                    <th className="text-xl font-normal">Subtotal</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div className="bg-gray-100 p-5">

            {items.length === 0 ? ( 
              <div className={`${emptyCart ? "animate-bounce2 text-red-500 font-semibold transition-all" : "font-light" } text-center`}>
                You currently do not have any Products in your shopping cart
              </div>
            ) : (
              items.map((item) => <CartItem key={item.id} item={item} />)
            )}

          </div>
        </div>
        <div className="flex flex-col lg:justify-start w-11/12 lg:w-1/4 ">
          <div className="bg-gray-100 p-5">
            <div className="flex flex-col items-start">
              <div className="text-xl font-bold">Order Summary</div>
              <div className="text-xs font-light">Total:</div>
            </div>
            <div className="flex justify-end text-xl font-semibold">
              {`₱${orderSubtotal.toFixed(2)}`}
            </div>
              <button 
                className={`w-full p-4 mt-7 text-xl ${emptyCart && 'animate-wiggle'} bg-gray-800 text-gray-50`} 
                onClick={submitOrder}
              >
                Check out
              </button>  
          </div>
          <div>
            <div className="flex justify-start text-md font-semibold pt-5">
              We Accept
            </div>
            <div className="flex justify-start">
              <img src={CODLogo} alt="CODIcon" />
              <img src={gcashLogo} alt="GCASHIcon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
