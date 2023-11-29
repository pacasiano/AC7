import React, { useState, useEffect } from 'react';
import Item1 from "../imgs/Item1.png";
import "../App.css";
import { useParams } from 'react-router-dom';

function Product() {

  const { sale_id } = useParams();
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState('');

  useEffect(() => {
    fetch(`/api/order_item/${sale_id}`)
      .then((res) => res.json())
      .then((orders) => {
        setOrders(orders);
      });
  }, [sale_id]);

  useEffect(() => {
    fetch(`/api/orders/${sale_id}`)
      .then((res) => res.json())
      .then((order) => {
        setOrderStatus(order[0].sale_status);
      });
  }, [sale_id]);
  
  return (
    <div className="mt-24 mb-20 min-h-screen p-10">
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
          <div className="pt-5">
            <div className="bg-gray-100 py-5 flex flex-col gap-5">
            {orders.map((order) => {return <ProductItem name={order.name} price={order.price} quantity={order.quantity}  />})}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-1/3">
          <OrderTotal sale_id={sale_id} />
          {/* <ShippingInfo sale_id={sale_id} /> */}
          <OrderActions orders={orderStatus} sale_id={sale_id} />
        </div>
      </div>
    </div>
  );
};

// the Product Item component
function ProductItem({name, price, quantity}) {

    let subTotal = (quantity  * price);
    return (
      <div className="px-5 bg-gray-100">
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
                <div className="text-xl self-start font-semibold pb-1">{name}</div>
                <div className="font-normal self-start text-sm">₱ {price}</div>
              </div>
            </td>
            <td className="w-1/4">
              <div className="flex justify-center">
                <div className="text-xl font-medium">{quantity}</div>
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
};

// the Order Total
function OrderTotal({sale_id}) {
  
  console.log(sale_id)
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`/api/order_item/${sale_id}`)
      .then((res) => res.json())
      .then((orders) => {
        setOrders(orders);
      });
  }, [sale_id]);
  
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
function ShippingInfo(sale_id) {

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

function OrderActions({orders: sale_status, sale_id}) {

  function cancelOrder() {
    fetch(`/api/orders/${sale_id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        new_sale_status: 'cancelled'
      })
    })
  }

  function completedOrder() {
    fetch(`/api/orders/${sale_id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        new_sale_status: 'complete'
      })
    })
  }

  return (
    <div className="bg-gray-100 p-5 gap-5 flex flex-col">
      <div className="text-xl font-bold">
        Order actions
      </div>
      <div className="flex flex-row gap-2 w-full">
        {/* currently disabled if order status is "cart" dapat it should be disabled when order status is "courrier" */}
        <button onClick={cancelOrder} disabled={sale_status !== 'packaging'} className={`${sale_status !== 'packaging' ? "bg-neutral-50 text-gray-500" : "bg-neutral-200" }  p-2 rounded-md w-full font-medium`}>Cancel order</button>
        <button onClick={completedOrder} disabled={sale_status !== 'shipped'} className={`${sale_status !== 'shipped' ? "bg-neutral-50 text-gray-500" : "bg-blue-300" } p-2 rounded-md w-full font-medium`}>Order Received</button>
      </div>
    </div>
  )
}

export default Product;
