import React, { useState, useEffect } from "react";
import "../App.css";
import CODLogo from "../imgs/CODLogo.png";
import gcashLogo from "../imgs/gcashLogo.png";
import CartItem from "../components/cartItem";

function Cart() {

  //GET ACCOUNT_ID COOKIE
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

  const cookie = document.cookie;
  const accountId = getAcctIdFromCookie(cookie);
  const [reloadData, setReloadData] = useState(false);

  const [emptyCart, setEmptyCart] = useState(false);

  function submitOrder() {
    if (items.length === 0) {
      setEmptyCart(true);
      setTimeout(() => {
        setEmptyCart(false);
      }, 3000);
    }else {
      window.location.href = "/AC7/checkout";
    }
  }

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`/api/cart/${accountId}`)
      .then((res) => res.json())
      .then((items) => {
        setItems(items);
        console.log(items)
      });
  }, [accountId, reloadData]);

  let orderSubtotal = 0;
  items.forEach((item) => {
    orderSubtotal += parseFloat(item.price) * item.quantity;
  })

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(loading){
      setLoading(false)
    }
  }, [items, loading]);

  
  return (
    <>
    <Invalid isModalOpen={emptyCart} />
    <div className="transition-all ease-in min-h-screen pt-16">
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
              <>
              {loading ? (
                <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-black border-t-black border-b-0 border-r-0 border-l-0"></div>
                <span className="ml-3">Loading...</span>
              </div>
              ) : (
                // Content to display when loading is false
                <div className={`font-light" text-center`}>
                  You currently do not have any Products in your shopping cart
                </div>
              )}
              </>
            ) : (
              items.map((item) => <CartItem key={item.id} item={item} setReloadData={setReloadData} reloadData={reloadData} />)
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
              <div className="">{"₱" + orderSubtotal.toFixed(2)}</div>
            </div>
              <button 
                className={`transition-all w-full p-4 mt-7 text-xl ${emptyCart && 'animate-wiggle'} bg-black/80 hover:bg-black text-gray-50`} 
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
    </>
  );
}

const Modal = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

function Invalid({isModalOpen}) {

  return (
    <div className="fixed pt-16">
      <Modal isOpen={isModalOpen}>
        <div className="w-screen flex justify-center items-center animate-bounce2 ">
            <div className="bg-gray-50 p-3 rounded-xl w-1/2 shadow-md border">
              <div className="text-red-500 text-md font-semibold text-center">You currently do not have any Products in your shopping cart</div>
            </div>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
