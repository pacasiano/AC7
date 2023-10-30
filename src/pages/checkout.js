import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "../App.css";
import CODLogo from "../imgs/CODLogo.png";
import gcashLogo from "../imgs/gcashLogo.png";

function Checkout() {

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

  const accountId = getAcctIdFromCookie(cookie);

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`/api/cart/${accountId}`)
      .then((res) => res.json())
      .then((items) => {
        setItems(items);
      });
  }, []);

  let totalPayment = 0;
  items.forEach((item) => {
    totalPayment += parseFloat(item.price) * item.quantity;
  })

    const [selectedOption, setSelectedOption] = useState('gcash');
      
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };

  return (
    <div className="Checkout">
      <form method="POST" action="http://localhost:8080/api/checkout" className="flex flex-col lg:flex-row lg:items-start items-center lg:gap-0 gap-5 justify-evenly py-20">
        <div className="flex flex-col lg:w-1/2 w-11/12 gap-5 ">
          <div className="bg-gray-100 p-5">
            <div className="flex flex-row justify-start pb-4 text-xl font-semibold">
              Payment Method
            </div>
            <div className="flex flex-row justify-start">
                <input name="paymentMethod" id="gcash" value="gcash" checked={selectedOption === 'gcash'} onChange={handleOptionChange}  type="radio"/>
                <label for="gcash" className="transition duration-300 ease-out hover:bg-gray-50 hover:-translate-y-0.5 active:bg-gray-200 active:translate-y-0 pl-2 pr-6 py-1 rounded-md cursor-pointer group-checked:bg-gray-600">
                Gcash</label>
                
                <input name="paymentMethod" id="cod" value="cod" checked={selectedOption === 'cod'} onChange={handleOptionChange} type="radio"/>
                <label for="cod" className="transition duration-300 ease-out hover:bg-gray-50 hover:-translate-y-0.5 active:bg-gray-200 active:translate-y-0 pl-2 py-1 rounded-md cursor-pointer checked:bg-gray500">
                Cash on Delivery</label>
            </div>
            {selectedOption === 'gcash' && (
            <div>
                <div className="flex flex-row justify-start pb-3 pt-2 text-xl font-semibold">
                    Billing Information
                </div>
                <div className="flex flex-col">
                    <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Gcash Number</span>
                        <input name="gcashNumber" type="text" className="rounded-sm"/>
                    </label>
                </div>
            </div>
            )}
            <div className="flex flex-row justify-start py-4 text-xl font-semibold">
                Shipping Information
            </div>
            <div className="flex xl:flex-row xl:gap-10 gap-5 flex-col pb-3">
                <div className="flex flex-col gap-5 ">
                    <div className="flex flex-row justify-start gap-5 w-1/2">
                        <label className="flex flex-col max-w-sm">
                            <span className="text-sm font-semibold">First Name</span>
                            <input name="firstName" className="rounded-sm"/>
                        </label>
                        <label className="flex flex-col max-w-sm">
                            <span className="text-sm font-semibold">Last Name</span>
                            <input name="lastName" className="rounded-sm"/>
                        </label> 
                   </div>
                        
                        <label className="flex flex-col max-w-sm">
                            <span className="text-sm font-semibold">Phone Number</span>
                            <input name="contactNumber" className="rounded-sm"/>
                        </label> 
                </div>
                <div className="flex flex-col xl:w-1/2 gap-5 ">
                    <label className="flex flex-col max-w-sm">
                      <span className="text-sm font-semibold">Baranggay</span>
                      <input name="brgy" className="rounded-sm"/>
                    </label> 
                    <label className="flex flex-col max-w-sm">
                      <span className="text-sm font-semibold">Street</span>
                      <input name="street" className="rounded-sm"/>
                    </label> 
                    <label className="flex flex-col max-w-sm">
                      <span className="text-sm font-semibold">Province</span>
                      <input name="province" className="rounded-sm"/>
                    </label> 
                    <label className="flex flex-col max-w-sm">
                      <span className="text-sm font-semibold">City</span>
                      <input name="city" className="rounded-sm"/>
                    </label> 
                    <label className="flex flex-col max-w-sm">
                      <span className="text-sm font-semibold">Zip Code</span>
                      <input name="zipcode" className="rounded-sm"/>
                    </label> 
                </div>
            </div>
          </div>
        </div>
 
        <div className="flex flex-col lg:justify-start w-11/12 lg:w-1/4 lg:pb-0">
          <div className="bg-gray-100 p-5">
            <div className="flex flex-col items-start">
              <div className="text-xl font-bold">Payment Summary</div>
              <ul className="p-2">
                {items.map((item) => {
                  return <CustomItem price={item.price} value={item.name} qty={item.quantity}></CustomItem>
                })}
              </ul>
              <div className="text-xs font-light">Total:</div>
            </div>
            <div className="flex justify-end text-xl font-semibold">
              {`$${totalPayment.toFixed(2)}`}
            </div>
            <Link to="/checkout">
              <button className="w-full bg-black text-white p-4 mt-7 text-xl">
                Pay
              </button>
            </Link>
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
      </form>

    </div>
  );
}

function CustomItem({price, value, qty}){
    return <li className={"text-sm font-semibold pb-1"}>{qty}<span className={"pl-3"}>{value}</span><span className={"text-xs font-light"}> - Php{price}</span></li>;
}

export default Checkout;
