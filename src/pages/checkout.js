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

    //Cart items summary
    const [items, setItems] = useState([]);

    useEffect(() => {
      fetch(`/api/cart/${accountId}`)
        .then((res) => res.json())
        .then((items) => {
          setItems(items);
        });
    }, []);

    //Payment summary
    let totalPayment = 0;
    items.forEach((item) => {
      totalPayment += parseFloat(item.price) * item.quantity;
    })

    // Payment method
    const [payment, setPayment] = useState('gcash');
    
    const handleOptionChange = (event) => {
      setPayment(event.target.value);
    };

    // Gcash reference number
    const [gcashRefNum, setGcashRefNum] = useState(null);

    const handleGcashRefNumChange = (event) => {
      setGcashRefNum(event.target.value);
    };

    //Fetch the addresses to be displayed in the Addresses drop down
    const [addresses, setAddress] = useState([]);

    useEffect(() => {
      fetch(`/api/address/${accountId}`)
        .then((res) => res.json())
        .then((addresses) => {
          setAddress(addresses);
        });
    }, []);

    // Addresses drop down
    const options = addresses.map((address) => (
      {
        value: address.name,
        label: address.name,
        barangay: address.barangay,
        street: address.street,
        province: address.province,
        city: address.city,
        zipCode: address.zip_code
      }
    ))
  
  // Selected address
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const [emptyFields, setEmptyFields] = useState(false);

  function sendPostReq(e) {
    e.preventDefault();

    if (items.length > 0 && selectedOption !== null && ((payment === "cod") || (payment === 'gcash' && gcashRefNum !== null))) {
    const reqData = {
      account_id: accountId,
      items_purchased: items,
      payment_method: payment,
      gcash_ref_num: gcashRefNum,
      address_name: selectedOption.value,
    }

    fetch('/api/checkout', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reqData)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Data message" + data.message)
        window.location.href = '/AC7/order/confirmation';
      })
      .catch((err) => {
        console.error("Error: ", err)
      })
    }else{
      setEmptyFields(true);
      setTimeout(() => {
        setEmptyFields(false);
      }, 2000);
    }
  }


  return (
    <>
    {items.length > 0 ? 
    <div className="Checkout h-screen pt-16">
      <form onSubmit={sendPostReq} id="billingInfo" className="flex flex-col lg:flex-row lg:items-start items-center lg:gap-0 gap-5 justify-evenly py-20">
        <div className="flex flex-col lg:w-1/2 w-11/12 gap-5 ">
          <div className="bg-gray-100 p-5">
            <div className="flex flex-row justify-start pb-4 text-xl font-semibold">
              Payment Method
            </div>
            <div className="flex flex-row justify-start">
                <input name="paymentMethod" id="gcash" value="gcash" checked={payment === 'gcash'} onChange={handleOptionChange}  type="radio" />
                <label for="gcash" className="transition duration-300 ease-out hover:bg-gray-50 hover:-translate-y-0.5 active:bg-gray-200 active:translate-y-0 pl-2 pr-6 py-1 rounded-md cursor-pointer group-checked:bg-gray-600">
                Gcash</label>
                
                <input name="paymentMethod" id="cod" value="cod" checked={payment === 'cod'} onChange={handleOptionChange} type="radio" />
                <label for="cod" className="transition duration-300 ease-out hover:bg-gray-50 hover:-translate-y-0.5 active:bg-gray-200 active:translate-y-0 pl-2 py-1 rounded-md cursor-pointer checked:bg-gray500">
                Cash on Delivery</label>
            </div>
            {payment === 'gcash' && (
            <div>
                <div className="flex flex-row justify-start pb-3 pt-2 text-xl font-semibold">
                    Billing Information
                </div>
                <div className="flex flex-col">
                    <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Gcash Reference Number</span>
                        <input onChange={handleGcashRefNumChange} name="gcashNumber" type="text" className={`${(gcashRefNum === null && emptyFields) && "border border-red-500"} rounded-md`} />
                        {/* <input value={gcashRefNum}/> */}
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
                className={`${(selectedOption === null && emptyFields) && "border border-red-500"} w-56 text-center text-sm h-13 bg-gray-100`}
                
              />
            <div>
              <div className="flex flex-row gap-5">
                <div className="text-md font-semibold w-1/6">Barangay:</div>
                <span className="text-md">{selectedOption?.barangay}</span>
              </div>
              <div className="flex flex-row gap-5">
                <div className="text-md font-semibold w-1/6">Street:</div>
                <span className="text-md">{selectedOption?.street}</span>
              </div>
              <div className="flex flex-row gap-5">
                <div className="text-md font-semibold w-1/6">Province:</div>
                <span className="text-md">{selectedOption?.province}</span>
              </div>
              <div className="flex flex-row gap-5">
                <div className="text-md font-semibold w-1/6">City:</div>
                <span className="text-md">{selectedOption?.city}</span>
              </div>
              <div className="flex flex-row gap-5">
                <div className="text-md font-semibold w-1/6">Zip Code:</div>
                <span className="text-md">{selectedOption?.zipCode}</span>
              </div>
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
              &#x20B1;{`${totalPayment.toFixed(2)}`}
            </div>
            {emptyFields ? <div className=" animate-bounce2 text-red-500 font-medium text-md text-center mb-2">
              Please fill out all the fields
            </div> : <div className="mb-7"></div>}
                {/* <Link to="/order/confirmation">
                </Link> */}
                <button type='submit' className={`${emptyFields && "animate-wiggle"} w-full bg-black text-white p-4 text-xl`}>
                  Pay
                </button>
                {/* <button onClick={sendPostReq} className="w-full bg-black text-white p-4 mt-7 text-xl">
                  Pay
                </button> */}
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
    :
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex justify-center text-xl font-semibold">
        You currently do not have any Products in your shopping cart
      </div>
      <div className="flex justify-center pt-5">
        <Link to="/store">
          <button className="bg-black rounded-xl w-60 text-white p-4 text-xl">
            Go to Store
          </button>
        </Link>
      </div>
    </div>
    }
    </>
  );}

function CustomItem({price, value, qty}){
  return <div className={"text-sm font-semibold pb-1 pl-5"}><span className='font-medium'>Php</span> {price}<span className={"text-md font-semibold pl-3"}>{qty}</span><span className='font-light'>x</span><span className={"pl-3 font-medium"}>{value}</span></div>;
}

export default Checkout;
