import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "../App.css";
import CODLogo from "../imgs/CODLogo.png";
import gcashLogo from "../imgs/gcashLogo.png";
import Select from "react-select"

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

    // dito mo makita anong type of payment
    const [Payment, setPayment] = useState('gcash');
      
    const handleOptionChange = (event) => {
      setPayment(event.target.value);
    };

    // dito mo ilagay yung mga Addresses
    const options = [
      {
        value: 'Address 1',
        label: 'Address 1',
        baranggay: 'Communal',
        street: 'Emerald',
        province: 'Davao Del Sur',
        city: 'Davao',
        zipCode: '8000',
      },
      {
        value: 'Address 2',
        label: 'Address 2',
        baranggay: 'Another Baranggay',
        street: 'Another Street',
        province: 'Another Province',
        city: 'Another City',
        zipCode: '12345',
      },
      {
        value: 'Address 3',
        label: 'Address 3',
        baranggay: 'Sample Baranggay',
        street: 'Sample Street',
        province: 'Sample Province',
        city: 'Sample City',
        zipCode: '98765',
      },
    ];
  
  // dito mo makita kung anong address naka select
  const [selectedOption, setSelectedOption] = useState("Address 1");

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };


  return (
    <div className="Checkout h-screen">
      <form method="POST" action="http://localhost:8080/api/checkout" className="flex flex-col lg:flex-row lg:items-start items-center lg:gap-0 gap-5 justify-evenly py-20">
        <div className="flex flex-col lg:w-1/2 w-11/12 gap-5 ">
          <div className="bg-gray-100 p-5">
            <div className="flex flex-row justify-start pb-4 text-xl font-semibold">
              Payment Method
            </div>
            <div className="flex flex-row justify-start">
                <input name="paymentMethod" id="gcash" value="gcash" checked={Payment === 'gcash'} onChange={handleOptionChange}  type="radio"/>
                <label for="gcash" className="transition duration-300 ease-out hover:bg-gray-50 hover:-translate-y-0.5 active:bg-gray-200 active:translate-y-0 pl-2 pr-6 py-1 rounded-md cursor-pointer group-checked:bg-gray-600">
                Gcash</label>
                
                <input name="paymentMethod" id="cod" value="cod" checked={Payment === 'cod'} onChange={handleOptionChange} type="radio"/>
                <label for="cod" className="transition duration-300 ease-out hover:bg-gray-50 hover:-translate-y-0.5 active:bg-gray-200 active:translate-y-0 pl-2 py-1 rounded-md cursor-pointer checked:bg-gray500">
                Cash on Delivery</label>
            </div>
            {Payment === 'gcash' && (
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
            {/* will edit pa the css of this part kasi medjo pangit */}
            <div className="flex flex-col gap-4 justify-start">
              <Select
                value={selectedOption}
                onChange={handleSelectChange}
                options={options}
                className="w-56 text-center text-sm h-13 bg-gray-100"
              />
              <table className="w-full border-collapse">
                  <thead>
                      <tr className="border-b-2">
                          <td className="text-sm font-semibold">Baranggay</td>
                          <td className="text-sm font-semibold">Street</td>
                          <td className="text-sm font-semibold">Province</td>
                          <td className="text-sm font-semibold">City</td>
                          <td className="text-sm font-semibold">Zip Code</td>
                      </tr>
                  </thead>
                  <tbody>
                    <tr className="">
                      <td className="text-sm font-medium baranggay-value">
                      {selectedOption?.baranggay}
                      </td>
                      <td className="text-sm font-medium street-value">
                      {selectedOption?.street}
                      </td>
                      <td className="text-sm font-medium province-value">
                      {selectedOption?.street}
                      </td>
                      <td className="text-sm font-medium city-value">
                      {selectedOption?.city}
                      </td>
                      <td className="text-sm font-medium zip-code-value">
                      {selectedOption?.zipCode}
                      </td>
                    </tr>
                  </tbody>
              </table>
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
