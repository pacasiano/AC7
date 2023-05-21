import React, { useState } from "react";
import Item1 from "/Users/peter/my-project/src/Item1.png";
import "../App.css";

function cart() {
  return (
    <div className="Cart">
      <div className="flex flex-row justify-evenly py-16">
        <div className="flex flex-col w-1/2 gap-5">
          <div className="bg-gray-100 p-5">
            <div className="flex flex-row justify-start pb-4 text-xl font-semibold">
              Item Summary
            </div>
            <div className="flex flex-row">
              <div className="ml-6">
                <input type="checkbox" /> All
              </div>
              <div className="text-md ml-[70px]">Item</div>
              <div className="text-md ml-[160px]">Price</div>
              <div className="text-md ml-[120px]">Quantity</div>
              <div className="text-md ml-[70px]">Total</div>
            </div>
          </div>
          <div className="flex flex-col">
            <CartSummary />
          </div>
        </div>
        <div className="flex flex-col w-1/4">
          <div className="bg-gray-100 p-5">
            <div className="flex flex-col items-start">
              <div className="text-xl font-bold">Order Summary</div>
              <div className="text-xs font-light">Subtotal:</div>
            </div>
            <div className="flex justify-end text-xl font-semibold">
              $100.00
            </div>
            <button className="w-full bg-black text-white p-4 mt-7 text-xl">
              Check out
            </button>
          </div>
          <div>
            <div className="flex justify-start text-md font-semibold pt-5">We Accept</div>
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
          <input type="checkbox" />
          <div className="w-36">
            <img src={Item1} className="object-fill rounded-md" alt="Item1" />
          </div>
          <div className="flex flex-col">
            <div className="flex justify-start text-xl font-bold pt-5 pb-2">{name}</div>
            <div className="flex flex-row justify-start gap-10">
              <div className="relative flex flex-col justify-center gap-3 w-40">
                <div className="flex justify-end text-md font-medium">$100.00</div>
                <button className="absolute -bottom-4 text-xs font-thin">Remove</button>
              </div>
              <div className="flex flex-row items-center w-24 pb-1">
                <button
                  onClick={decrementQuantity}
                  className="flex justify-center m-0 mt-1 p-1 w-1/3 align-middle text-md hover:font-extrabold">-</button>
                <div className="inline-block align-middle m-0 pt-2 p-1 w-1/3 text-md font-semibold">{quantity}</div>
                <button
                  onClick={incrementQuantity}
                  className="flex justify-center m-0 mt-1 p-1 w-1/3 align-middle text-md hover:font-extrabold">+</button>
              </div>
              <div className="flex flex-col justify-center w-16 text-md font-semibold">
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

    for (var i = 0; i < 3; i++){
        Items.push(<CartItem />);
    };

    return (
        Items
    );
}
                

export default cart;
