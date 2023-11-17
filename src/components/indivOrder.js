import React, { useState, useEffect } from 'react';
import Item1 from "../imgs/Item1.png";
import "../App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useParams } from 'react-router-dom';




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
  const { sale_id } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`/api/order_item/${sale_id}`)
      .then((res) => res.json())
      .then((orders) => {
        setOrders(orders);
      });
  }, []);

  const itemCards = orders.map((order) => {
    let subTotal = (order.quantity  * order.price);
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
              <div className="flex justify-start text-xl font-bold pt-0 pb-1">{order.name}</div>
              <div className="flex justify-start font-normal text-sm">{order.price}</div>
            </td>
            <td className="p-5">
              <div className="flex justify-start text-xl font-medium">{order.quantity}</div>
            </td>
            <td className="p-5">
              <div className="flex justify-start text-xl font-medium">{subTotal}</div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  });
  return (
    <div className="flex flex-col gap-4">
      {itemCards}
    </div>
  );
};

// the Order Total
function OrderTotal() {
  const { sale_id } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`/api/order_item/${sale_id}`)
      .then((res) => res.json())
      .then((orders) => {
        setOrders(orders);
      });
  }, []);
  let total = 0;
  orders.map((order) => {
    total = total + (order.quantity * order.price);
    console.log(total);
  });
  console.log(total);
  return (
    <div>
      <div className="bg-gray-100 text-xl font-bold p-5 flex items-center">
        Order Total
      </div>
      <div className="p-5 bg-slate-100">{total} PHP</div>
    </div>
  );
};

// Shipping info
function ShippingInfo() {
  
  const { sale_id } = useParams();
  const [address, setAddress] = useState();
  
  useEffect(() => {
    const getAddress = async () => {
      const response = await fetch(`/api/shipment/${sale_id}`);
      const data = await response.json();
      if (data) {
        setAddress(data);
      }
    };
    getAddress();
  }, [sale_id]);
  console.log(address);
  


 
  return (
    <div className="">
      <div className="bg-gray-100 text-xl font-bold p-5 flex items-center">
        Shipping
      </div>
      <div className="flex-col  p-5 bg-slate-100">
        <div className="font-bold">
          {address && (
            <p>{address[0].name}</p>)}
        </div>
        <div>
          {address && (
            <p>{address[0].province}</p>)}
        </div>
        <div>
          {address && (
            <p>{address[0].city}</p>)}
        </div>
        <div>
          {address && (
            <p>{address[0].barangay}</p>)}
        </div>
        <div>
          {address && (
            <p>{address[0].zip_code}</p>)}
        </div>
        <div>
          {address && (
            <p>{address[0].street}</p>)}
        </div>
      
  
      </div>
    </div>
  );
  
};

export default Product;
