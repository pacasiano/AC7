import React, { useState } from "react";
import Item1 from "../imgs/Item1.png";
import "../App.css";
import { Link } from "react-router-dom";
import CODLogo from "../imgs/CODLogo.png";
import gcashLogo from "../imgs/gcashLogo.png";

function Cart() {
  return (
    <div className="Cart">
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
                    <th className="text-xl font-normal">Total</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div className="bg-gray-100 p-5">
            <CartSummary />
          </div>
        </div>
        <div className="flex flex-col lg:justify-start w-11/12 lg:w-1/4 ">
          <div className="bg-gray-100 p-5">
            <div className="flex flex-col items-start">
              <div className="text-xl font-bold">Order Summary</div>
              <div className="text-xs font-light">Subtotal:</div>
            </div>
            <div className="flex justify-end text-xl font-semibold">
              $100.00
            </div>
            <Link to="/checkout">
              <button className="w-full bg-black text-white p-4 mt-7 text-xl">
                Check out
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
      </div>
    </div>
  );
}

function CartItem() {
  var name = "Beauty Pill";
  var price = 100;

  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(price);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
    setTotal(total + price);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setTotal(total - price);
    }
  };

  return (
      <table className="table-fixed w-full">
        <tbody>
          <tr>
            <td className="p-2">
              <div className="flex justify-center">
              <img  
                src={Item1}
                className="object-scale-down rounded-md w-full h-36"
                alt="Item1"
              />
              </div>
            </td>
            <td className="">
              <div className="flex flex-col justify-center items-center ">
                <div>
                  <div className="flex justify-start text-xl font-bold pt-0 pb-2  ">
                    {name}
                  </div>
                  <div className="flex justify-start font-normal text-sm ">
                    $100.00
                  </div>
                  <button className="absolute  text-xs font-thin ">
                    Remove
                  </button>
                </div>  
              </div>
            </td>
            <td className="pb-1 ">
              <div className="flex flex-row gap-5 justify-center"> 
                <button onClick={decrementQuantity}className="flex justify-center m-0 mt-1 p-1 text-xl hover:font-extrabold ">
                  -
                </button>
                  <div className="flex justify-center m-0 pt-2 text-xl font-light ">
                    {quantity}
                  </div>
                <button onClick={incrementQuantity} className="flex justify-center m-0 mt-1 p-1 text-xl hover:font-extrabold ">
                    +
                </button>
              </div>
            </td>
            <td className="text-xl font-medium ">
              <div className="flex justify-center">
                ${total}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
  );
}

function CartSummary() {
  let Items = [];

  for (var i = 0; i < 3; i++) {
    Items.push(<CartItem />);
  }

  return Items;
}

export default Cart;
