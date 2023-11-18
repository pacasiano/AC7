import React, { useState, useEffect } from 'react';
import Item1 from "../imgs/Item1.png";
import "../App.css";
import { useParams } from 'react-router-dom';

function Product() {
  
  return (
    <div className="mt-24 h-screen p-10">
      <div className="flex flex-row justify-center gap-10">
        <div className="flex flex-col w-3/6">
          <div className="flex flex-col bg-gray-100 p-5">
            <div className=" text-xl font-bold pb-2 flex items-center">
              Ordered items
            </div>
            <table class="table-fixed w-full">
              <thead>
                <tr>
                  <th className="text-xl font-normal w-1/4  ">Item</th>
                  <th className="text-xl font-normal w-1/4  ">Price</th>
                  <th className="text-xl font-normal w-1/4  ">Quantity</th>
                  <th className="text-xl font-normal w-1/4  ">Subtotal</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="flex flex-col pt-4 gap-5">
            {/* This should be repeating based on the number of items in the order */}
            <ProductItem />
          </div>
        </div>
        <div className="flex flex-col gap-5 w-1/3">
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
      <div className="p-5 bg-gray-100">
      <table className="table-fxed w-full">
        <tbody>
          <tr>
            <td className="w-1/4">
              <img
                src={Item1}
                className="object-cover rounded-md h-36"
                alt="Item1"
              />
            </td>
            <td className="w-1/4">
              <div className="flex flex-col justify-center items-center translate-x-3">
                <div className="text-xl font-semibold pb-1">{order.name}</div>
                <div className="font-normal self-start text-sm">₱ {order.price}</div>
              </div>
            </td>
            <td className="w-1/4">
              <div className="flex justify-center">
                <div className="text-xl font-medium">{order.quantity}</div>
              </div>
            </td>
            <td className="w-1/4">
              <div className="flex justify-center whitespace-nowrap">
                <div className="text-xl font-medium">₱ {subTotal}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
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
  orders.forEach((order) => {
    total = total + (order.quantity * order.price);
  });
  console.log(total);

  return (
    <div className='bg-gray-100 p-5'>
      <div className=" text-xl font-bold pb-2 flex items-center">
        Order Total
      </div>
      {orders.map((item) => {
          return <CustomItem price={item.price} value={item.name} qty={item.quantity}></CustomItem>
        })}
      <div className="pb-2 pt-3 bg-slate-100 text-right text-xl font-extrabold">Php {total}.00</div>
    </div>
  );
};

function CustomItem({price, value, qty}){
  return <div className={"text-sm font-semibold pb-1 pl-5"}><span className='font-medium'>Php</span> {price}<span className={"text-md font-semibold pl-3"}>{qty}</span><span className='font-light'>x</span><span className={"pl-3 font-medium"}>{value}</span></div>;
}

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
      <div className="bg-gray-100 text-xl font-bold pt-5 px-5 pb-2 flex items-center">
        Shipping
      </div>
      <div className="flex-col  pb-5 pl-10 bg-slate-100">
        <div className="font-medium">
          {address && (
            <p>{address[0].name}</p>)}
        </div>
        <div className="font-light pl-1">
          {address && (
            <p>{address[0].province}</p>)}
        </div>
        <div className="font-light pl-1">
          {address && (
            <p>{address[0].city}</p>)}
        </div>
        <div className="font-light pl-1">
          {address && (
            <p>{address[0].barangay}</p>)}
        </div>
        <div className="font-light pl-1">
          {address && (
            <p>{address[0].zip_code}</p>)}
        </div>
        <div className="font-light pl-1">
          {address && (
            <p>{address[0].street}</p>)}
        </div>
      
  
      </div>
    </div>
  );
  
};

export default Product;
