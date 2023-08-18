import React, { useState } from "react";
import Item1 from "../imgs/Item1.png";
import "../App.css";
import { Link } from "react-router-dom";

function Cart() {
  return (
    <div className="Cart">
      <div className="flex flex-col lg:flex-row lg:items-start items-center lg:gap-0 gap-5 justify-evenly py-16">
        <div className="flex flex-col lg:w-1/2 w-11/12 gap-5 ">
          <div className="bg-gray-100 p-5">
            <div className="flex flex-row justify-start pb-4 text-xl font-semibold">
              Item Summary
            </div>
            <div className="flex flex-row justify-evenly lg:-mx-20 -mx-5">
              <div className="">
                <input type="checkbox" /> All
              </div>
              <div className="text-md ">Item</div>
              <div className="text-md ">Price</div>
              <div className="text-md ">Quantity</div>
              <div className="text-md ">Total</div>
            </div>
          </div>
          <div className="flex flex-col">
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
            <div className="flex justify-start">cod and gcash img</div>
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
    <div className="flex flex-col w-full">
      <div className="bg-gray-100 p-5">
        <div className="flex flex-row justify-evenly gap-5">
          <div className="flex items-center">
            <input type="checkbox" />
          </div>
          <div className="lg:w-36 md:w-32 w-28 flex-shrink-0">
            <img
              src={Item1}
              className="object-fill resize-none rounded-md w-36"
              alt="Item1"
            />
          </div>
          <div className="flex flex-col  w-2/4">
            <div className="flex justify-start text-xl font-bold lg:pt-5 pt-0 pb-2 ">
              {name}
            </div>
            <div className="flex flex-row justify-evenly lg:gap-10 gap-0">
              <div className="relative flex flex-col justify-center gap-3">
                <div className="flex justify-end lg:text-md font-medium text-sm">
                  $100.00
                </div>
                <button className="absolute -bottom-4 text-xs font-thin ">
                  Remove
                </button>
              </div>
              <div className="flex flex-row items-center justify-center lg:w-24 w-16 pb-1 ">
                <button
                  onClick={decrementQuantity}
                  className="flex justify-center m-0 mt-1 p-1 w-1/3 align-middle lg:text-md text-xs hover:font-extrabold "
                >
                  -
                </button>
                <div className="flex justify-center m-0 pt-2 p-1 lg:w-1/3 w-1/5 lg:text-md text-sm font-semibold ">
                  {quantity}
                </div>
                <button
                  onClick={incrementQuantity}
                  className="flex justify-center m-0 mt-1 p-1 w-1/3 align-middle lg:text-md text-xs hover:font-extrabold "
                >
                  +
                </button>
              </div>
              <div className="flex flex-col justify-center lg:w-16 w-12 lg:text-md text-sm font-semibold ">
                ${total}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
