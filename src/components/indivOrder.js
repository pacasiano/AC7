import React, { useState, useEffect } from 'react';
import Item1 from "../imgs/Item1.png";
import "../App.css";
import { useParams } from 'react-router-dom';
import Check from "../imgs/check.png";
import { Link } from "react-router-dom";

function Product() {

  const { sale_id } = useParams();
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState('');
  const [cancelled, setCancelled] = useState(false);
  const [received, setReceived] = useState(false);
  const [returnOrder, setReturnOrder] = useState(false);
  const [returnSucces, setReturnSuccess] = useState(false);

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
  console.log(orderStatus)
  
  return (
    <>
    <Cancelled isModalOpen={cancelled} />
    <Received isModalOpen={received} />
    <ReturnSuccess isModalOpen={returnSucces} />
    <Return isModalOpen={returnOrder} setisModalOpen={setReturnOrder} setReturnSuccess={setReturnSuccess} />
    <div className="b-24 min-h-screen">
      <div className=" text-2xl font-light py-20 -mb-10 flex flex-row gap-5 items-center justify-center">
        <Link to="/orders" className="transition-all text-black/50 hover:text-black">Orders</Link><span className='text-black/30'>{">"}</span><div>{sale_id}</div>
      </div>
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
          {(orderStatus === "shipped" || orderStatus === "packed" || orderStatus === "processing order") &&
          <OrderActions orders={orderStatus} sale_id={sale_id} setCancelled={setCancelled} setReceived={setReceived} setReturnOrder={setReturnOrder} />
          }
        </div>
      </div>
    </div>
    </>
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
        <div className="flex flex-col gap-2 pt-3">
          <div className="flex flex-col gap-2">
            <div className="flex justify-start text-md font-semibold">Shipping Fee</div>
            <div className="pl-5 text-xs font-semibold whitespace-nowrap">Php 0.00</div>
          </div>
          <div className="pb-5 flex flex-col gap-2">
            <div className="flex justify-start text-md font-semibold">Tax</div>
            <div className="pl-5 text-xs font-semibold whitespace-nowrap">Php 0.00</div>
          </div>
        </div>
      <div className="pb-2 bg-slate-100 text-right text-xl font-extrabold">Php {total}.00</div>
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

function OrderActions({orders: sale_status, sale_id, setCancelled, setReceived, setReturnOrder}) {

  function cancelOrder(e) {
    e.preventDefault();

    fetch(`/api/orders/${sale_id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        new_sale_status: 'cancelled'
      })
    })
    .then((data) => {
      console.log(data)
      console.log('Order cancelled!')
      setCancelled(true);
    })
    .catch(error => {
      console.error('Error cancelling order:', error);
      // Handle the error as needed
    });
  }
  

  function completedOrder(e) {
    e.preventDefault();
    
    fetch(`/api/orders/${sale_id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        new_sale_status: 'completed'
      })
    })
    .then(() => {
      console.log('Order received!')
      setReceived(true);
    })
    .catch(error => {
      console.error('Error cancelling order:', error);
      // Handle the error as needed
    });
  }

  return (
    <div className="bg-gray-100 p-5 gap-5 flex flex-col">
      <div className="text-xl font-bold">
        Order actions
      </div>
      <div className="flex flex-row gap-2 w-full">
        {/* currently disabled if order status is "cart" dapat it should be disabled when order status is "courier" */}
        {sale_status === "shipped" ? (
        <button onClick={() => setReturnOrder(true)} disabled={sale_status !== 'shipped'} className={`${sale_status !== 'shipped' ? "bg-neutral-50 text-gray-500" : "bg-black/10" } transition-all ${sale_status === 'shipped' && "hover:bg-black/20"} p-2 rounded-md w-full font-medium`}>Return order</button>
        ):(
        <button onClick={cancelOrder} disabled={sale_status !== 'packed' && sale_status !== 'processing order'} className={`${sale_status !== 'packed' && sale_status !== 'processing order' ? "bg-neutral-50 text-gray-500" : "bg-black/10" } transition-all ${(sale_status === 'packed' || sale_status === 'processing order') && "hover:bg-black/20"} p-2 rounded-md w-full font-medium`}>Cancel order</button>
        )}
        <button onClick={completedOrder} disabled={sale_status !== 'shipped'} className={`${sale_status !== 'shipped' ? "bg-neutral-50 text-gray-500" : "bg-black/10" } transition-all ${sale_status === 'shipped' && "hover:bg-black/20"} p-2 rounded-md w-full font-medium`}>Order Received</button>
        
      </div>
    </div>
  )
}

const Modal = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

function Cancelled({isModalOpen}) {

  return (
    <div className="fixed backdrop-blur-sm bg-black/20 drop-shadow-xl z-50">
        <Modal isOpen={isModalOpen}>
          <div className="h-screen w-screen flex justify-center items-center backdrop-blur-sm bg-white/30 ">
              <div className="fixed bg-gray-100 -mt-20 rounded-xl w-96">
                  <div className="p-5 flex flex-col justify-center items-center gap-2">
                      <img src={Check} alt="check" className="w-32 h-32"/>
                      <span className="text-xl font-bold">Order cancelled!</span>
                      <Link to={"/orders"} className="bg-gray-200 p-2 text-center rounded-xl w-60">Continue</Link>
                  </div>
              </div>
          </div>
        </Modal>
      </div>
  );
};

function Received({isModalOpen}) {

  return (
    <div className="fixed backdrop-blur-sm bg-black/20 drop-shadow-xl z-50">
        <Modal isOpen={isModalOpen}>
          <div className="h-screen w-screen flex justify-center items-center backdrop-blur-sm bg-white/30 ">
              <div className="fixed bg-gray-100 -mt-20 rounded-xl w-96">
                  <div className="p-5 flex flex-col justify-center items-center gap-2">
                      <img src={Check} alt="check" className="w-32 h-32"/>
                      <span className="text-xl font-bold">Order Received!</span>
                      <Link to={"/orders"} className="bg-gray-200 p-2 text-center rounded-xl w-60">Continue</Link>
                  </div>
              </div>
          </div>
        </Modal>
      </div>
  );
};

function ReturnSuccess({isModalOpen}) {

  return (
    <div className="fixed backdrop-blur-sm bg-black/20 drop-shadow-xl z-50">
        <Modal isOpen={isModalOpen}>
          <div className="h-screen w-screen flex justify-center items-center backdrop-blur-sm bg-white/30 ">
              <div className="fixed bg-gray-100 -mt-20 rounded-xl w-96">
                  <div className="p-5 flex flex-col justify-center items-center gap-2">
                      <img src={Check} alt="check" className="w-32 h-32"/>
                      <span className="text-xl font-bold">Return request sent!</span>
                      <Link to={"/orders"} className="bg-gray-200 p-2 text-center rounded-xl w-60">Continue</Link>
                  </div>
              </div>
          </div>
        </Modal>
      </div>
  );
};

function Return({isModalOpen, setisModalOpen, setReturnSuccess}) {

  const [returnSet, setReturnSet] = useState({
    proof: '',
    reason: ''
  });

  function handleChange(e) {
    const { name, value, files } = e.target;
  
    if (name === 'proof') {
      // Handle file input separately
      const file = files[0];
      setReturnSet((prev) => ({
        ...prev,
        [name]: file || '' // If no file is selected, set to an empty string or handle accordingly
      }));
    } else {
      // Handle text input
      setReturnSet((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  }
  
  // Dito yung return form submit function
  function handleSubmit(e) {
    e.preventDefault();

    
    // lagay mo dito API

    console.log('Form submitted!');
    console.log(returnSet);
    setisModalOpen(false);
    setReturnSuccess(true);
    // ipasok mo itong nasa taas sa .then ng API

  }

  return (
    <div className="fixed backdrop-blur-sm bg-black/20 drop-shadow-xl z-50">
        <Modal isOpen={isModalOpen}>
          <div className="h-screen w-screen flex justify-center items-center backdrop-blur-sm bg-white/30 ">
            <form onSubmit={handleSubmit} className="fixed bg-gray-100 -mt-20 rounded-xl w-[40rem]">
                <div className="flex flex-col gap-5 text-center py-5 px-10">
                  <div className="text-2xl font-bold">
                    Return Request Form
                  </div>
                  <div className="flex flex-col gap-5">

                    <div className="flex flex-col gap-2">
                      <div className="text-md text-left font-bold">
                        Proof
                      </div>
                      <div>
                        <input name="proof" id="proof" onChange={handleChange} accept="image/*" type="file" className="w-full border-2 border-black/60 rounded-md p-2" required/>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="text-md text-left font-bold">
                        Reason for return
                      </div>
                      <div>
                        <textarea name="reason" onChange={handleChange} value={returnSet.reason} className="w-full h-44 border-2 border-black/60 rounded-md p-2 resize-none" required/>
                      </div>
                    </div>

                    <div className="flex flex-row gap-1">
                    <button type="button" onClick={() =>  setisModalOpen(false)} className="bg-black/80 hover:bg-black text-gray-50 p-2 rounded-md w-1/2 font-medium">Cancel</button>
                    <button type="submit" className="bg-green-900/80 hover:bg-green-900 text-gray-50 p-2 rounded-md w-full font-medium">Submit</button>
                    </div>
                  </div>
                </div>
            </form>
          </div>
        </Modal>
      </div>
  );
};

export default Product;
