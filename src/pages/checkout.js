import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Checkout() {

    const [selectedOption, setSelectedOption] = useState('gcash');
      
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };

  return (
    <div className="Checkout">
      <div className="flex flex-col lg:flex-row lg:items-start items-center lg:gap-0 gap-5 justify-evenly py-20">
        <div className="flex flex-col lg:w-1/2 w-11/12 gap-5 ">
          <div className="bg-gray-100 p-5">
            <div className="flex flex-row justify-start pb-4 text-xl font-semibold">
              Payment Method
            </div>
            <div className="flex flex-row justify-start gap-5">
                <label className="transition duration-300 ease-out hover:bg-gray-50 hover:-translate-y-0.5 active:bg-gray-200 active:translate-y-0 px-2 py-1 rounded-md cursor-pointer group-checked:bg-gray-600">
                    <input value="gcash" checked={selectedOption === 'gcash'} onChange={handleOptionChange}  type="radio" name="paymentType"/>
                &nbsp;Gcash</label>
                <label className="transition duration-300 ease-out hover:bg-gray-50 hover:-translate-y-0.5 active:bg-gray-200 active:translate-y-0 px-2 py-1 rounded-md cursor-pointer checked:bg-gray500">
                    <input value="cod" checked={selectedOption === 'cod'} onChange={handleOptionChange} type="radio" name="paymentType"/>
                &nbsp;Cash on Delivery</label>
            </div>
            {selectedOption === 'gcash' && (
            <div>
                <div className="flex flex-row justify-start pb-3 pt-2 text-xl font-semibold">
                    Billing Information
                </div>
                <form className="flex flex-col">
                    <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Gcash Number</span>
                        <input className="rounded-sm"/>
                    </label>
                </form>
            </div>
            )}
            <div className="flex flex-row justify-start py-4 text-xl font-semibold">
                Shipping Information
            </div>
            <form className="flex xl:flex-row xl:gap-10 gap-5 flex-col pb-3">
                <div className="flex flex-col gap-5 ">
                    <div className="flex flex-row justify-start gap-5 w-1/2">
                        <label className="flex flex-col max-w-sm">
                            <span className="text-sm font-semibold">First Name</span>
                            <input className="rounded-sm"/>
                        </label>
                        <label className="flex flex-col max-w-sm">
                            <span className="text-sm font-semibold">Last Name</span>
                            <input className="rounded-sm"/>
                        </label> 
                   </div>
                        <label className="flex flex-col max-w-sm">
                            <span className="text-sm font-semibold">Address</span>
                            <input className="rounded-sm"/>
                        </label> 
                        <label className="flex flex-col max-w-sm">
                            <span className="text-sm font-semibold">Phone Number</span>
                            <input className="rounded-sm"/>
                        </label> 
                </div>
                <div className="flex flex-col xl:w-1/2 gap-5 ">
                    <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">City</span>
                        <input className="rounded-sm"/>
                    </label> 
                    <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Zip Code</span>
                        <input className="rounded-sm"/>
                    </label> 
                </div>
            </form>
          </div>
        </div>
 
        <div className="flex flex-col lg:justify-start w-11/12 lg:w-1/4 lg:pb-0">
          <div className="bg-gray-100 p-5">
            <div className="flex flex-col items-start">
              <div className="text-xl font-bold">Payment Summary</div>
              <ul className="p-2">
                <CustomItem price={"100"} value={"Beauty Pill"}></CustomItem>
                <CustomItem price={"100"} value={"Beauty Pill"}></CustomItem>
              </ul>
              <div className="text-xs font-light">Subtotal:</div>
            </div>
            <div className="flex justify-end text-xl font-semibold">
              $100.00
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
            <div className="flex justify-start">cod and gcash img</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomItem({value, price}){
    return <li className={"text-sm font-semibold"}>{value}<span className={"text-xs font-light"}> - Php{price}</span></li>;
}

export default Checkout;
