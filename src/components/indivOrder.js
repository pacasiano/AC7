import React from "react";
import Item1 from "../imgs/Item1.png";
import "../App.css";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <div className="mt-24 h-screen p-10">
      <div className="flex flex-row justify-center gap-10">
        <div className="flex flex-col w-3/6">
          <div className="bg-gray-100 p-5">
            <div className=" text-xl font-bold pb-5 flex items-center">
              Ordered items
            </div>
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
          <div className="flex flex-col pt-4 gap-5">
            {/* This should be repeating based on the number of items in the order */}
            <ProductItem />
          </div>
        </div>

        <div className="flex flex-col space-y-10 w-1/3">
          <OrderTotal />
          <ShippingInfo />
        </div>
      </div>
    </div>
  );
};

// the Product Item (This is repeating depending on the number of items in the order)
function ProductItem() {
  return (
    <table className="table-fixed w-full bg-gray-100">
      <tbody>
        <tr>
          <td className="p-5 w-48 ">
            <img
              src={Item1}
              className="object-scale-down rounded-md h-36"
              alt="Item1"
            />
          </td>
          <td className="p-5">
            <div className="flex justify-start text-xl font-bold pt-0 pb-1">name</div>
            <div className="flex justify-start font-normal text-sm">$100.00</div>
          </td>
          <td className="p-5">
            <div className="flex justify-start text-xl font-medium">Quantity</div>
          </td>
          <td className="p-5">
            <div className="flex justify-start text-xl font-medium">Subtotal</div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

// the Order Total
function OrderTotal() {
  return (
    <div>
      <div className="bg-gray-100 text-xl font-bold p-5 flex items-center">
        Order Total
      </div>
      <div className="p-5 bg-slate-100">test</div>
    </div>
  );
};

// Shipping info
function ShippingInfo() {
  return (
    <div className="">
      <div className="bg-gray-100 text-xl font-bold p-5 flex items-center">
        Shipping Info
      </div>
      <div className="p-5 bg-slate-100">test</div>
    </div>
  );
};

export default Product;
