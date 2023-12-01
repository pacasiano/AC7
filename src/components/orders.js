import React, { useState, useEffect, useContext } from 'react';
import "../App.css";
import Order from './ordersExpand';
import Select from "react-select";
import Check from "../imgs/check.png";
import { myContext } from '../context/adminContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

export default function Orders() {

    // const today = new Date().toLocaleDateString();

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [reloadData, setReloadData] = useState(false);
    const [shipped, setShipped] = useState(false);
    const [returned, setReturned] = useState(false);
    const [packed, setPacked] = useState(false);
    const [options, setOptions] = useState([])
    const { setPage } = useContext(myContext);

    useEffect(() => {
        fetch('/api/orders')
            .then((res) => res.json())
            .then((orders) => {
                setOrders(orders);
            });
    }, [reloadData]);

    useEffect(() => {
        // Assuming orders is a state variable or a prop
        const newOptions = [
          { value: 'All', label: 'All' },
          ...orders.map((order) => ({
            value: order.sale_id,
            label: `${order.sale_id} - ${order.full_name} - ${order.sale_date}`,
          })),
        ];
    
        // Set the options in the component state
        setOptions(newOptions);
      }, [orders]);

    // Filter products based on the selected value
    // Filter users based on the selected value
    const filteredOrders = selectedOrder
    ? selectedOrder.value === 'All'
        ? orders
        : orders.filter((order) => order.sale_id === selectedOrder.value)
    : orders;

    console.log(orders)

    return(<>
        <Shipped isModalOpen={shipped} setModalOpen={setShipped} />
        <Returned isModalOpen={returned} setModalOpen={setReturned} />
        <Packed isModalOpen={packed} setModalOpen={setPacked} />
        <div className="h-screen px-8 pt-8">
            <div className="flex flex-col gap-5 ">
                <div id="header" className="flex flex-row justify-between">
                    <span className="text-xl font-bold">Orders</span>
                    <Select options={options} className="w-96" onChange={(selectedOption) => setSelectedOrder(selectedOption)} />
                </div>
                <div className="flex flex-row justify-evenly w-full p-5">
                  <DailySales sales={orders} />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row justify-between bg-gray-200 w-full p-5">
                        <div>
                            <span className="text-md font-bold">Order List</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            {/* <button><span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">View All</span></button> */}
                            <button onClick={() => setPage("returned")}><span className=" text-md bg-gray-100 px-2 py-1 rounded-md font-bold">Returns</span></button>
                        </div>
                    </div>
                    <div className="pb-10">
                        <table className="w-full border-collapse table-auto border">
                            <thead>
                                <tr className="bg-gray-400 border">
                                    <th className="sticky bg-gray-400 text-sm font-semibold border p-2 text-white">Order ID</th>
                                    <th className="sticky  bg-gray-400 text-sm font-semibold border p-2 text-white">User ID</th>
                                    {/* <th className="text-sm font-semibold border p-2 text-white">Product ID</th> */}
                                    <th className="sticky  bg-gray-400 text-sm font-semibold border p-2 text-white">Full Name</th>
                                    <th className="sticky  bg-gray-400 text-sm font-semibold border p-2 text-white">Date</th>
                                    <th className="sticky  bg-gray-400 text-sm font-semibold border p-2 text-white">Status</th>
                                    {/* <th className="text-sm font-semibold border p-2 text-white">Quantity</th> */}
                                    <th className="sticky  bg-gray-400 text-sm font-semibold border p-2 text-white">Total</th>
                                    <th className="sticky  bg-gray-400 text-sm font-semibold border p-2 text-white">Actions</th>
                                </tr>
                            </thead>
                            {filteredOrders.map((order) => (
                            <Order key={order.sale_id} order={order} setReloadData={setReloadData} setShipped={setShipped} setReturned={setReturned} setPacked={setPacked} reloadData={reloadData} />
                            ))}
                        </table>
                    </div>
                </div>
            </div>   
        </div>
        </>
    );
};

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
  
  function Shipped({isModalOpen, setModalOpen}) {
  
    return (
      <div className="fixed backdrop-blur-sm bg-black/20 -translate-x-56 drop-shadow-xl z-50">
          <Modal isOpen={isModalOpen}>
            <div className="h-screen w-screen flex justify-center items-center backdrop-blur-sm bg-white/30 ">
                <div className="fixed bg-gray-100 -mt-20 rounded-xl w-96">
                    <div className="p-5 flex flex-col justify-center items-center gap-5">
                        <img src={Check} alt="check" className="w-32 h-32"/>
                        <span className="text-xl font-bold">Order status changed to Shipped!</span>
                        <button onClick={() => setModalOpen(false)} className="bg-gray-200 p-2 text-center rounded-xl w-60">Continue</button>
                    </div>
                </div>
            </div>
          </Modal>
        </div>
    );
  };
  
  function Returned({isModalOpen, setModalOpen}) {
  
    return (
      <div className="fixed backdrop-blur-sm bg-black/20 drop-shadow-xl -translate-x-56 z-50">
          <Modal isOpen={isModalOpen}>
            <div className="h-screen w-screen flex justify-center items-center backdrop-blur-sm bg-white/30 ">
                <div className="fixed bg-gray-100 -mt-20 rounded-xl w-96">
                    <div className="p-5 flex flex-col justify-center items-center gap-5">
                        <img src={Check} alt="check" className="w-32 h-32"/>
                        <span className="text-xl font-bold">Order Status changed to Returned!</span>
                        <button onClick={() => setModalOpen(false)} className="bg-gray-200 p-2 text-center rounded-xl w-60">Continue</button>
                    </div>
                </div>
            </div>
          </Modal>
        </div>
    );
  };

  function Packed({isModalOpen, setModalOpen}) {
  
    return (
      <div className="fixed backdrop-blur-sm bg-black/20 drop-shadow-xl -translate-x-56 z-50">
          <Modal isOpen={isModalOpen}>
            <div className="h-screen w-screen flex justify-center items-center backdrop-blur-sm bg-white/30 ">
                <div className="fixed bg-gray-100 -mt-20 rounded-xl w-96">
                    <div className="p-5 flex flex-col justify-center items-center gap-5">
                        <img src={Check} alt="check" className="w-32 h-32"/>
                        <span className="text-xl font-bold">Order Status changed to Packed!</span>
                        <button onClick={() => setModalOpen(false)} className="bg-gray-200 p-2 text-center rounded-xl w-60">Continue</button>
                    </div>
                </div>
            </div>
          </Modal>
        </div>
    );
  };

function DailySales(sales) {

const today = new Date();

  // total number of sales for the day
  const totalSales = sales.sales.length === 0 ? 0 : sales.sales.filter((sale) => sale.sale_date === today).length;

  return( //64
  <div className="flex flex-row justify-center p-5 bg-black/5 shadow-xl rounded-md">
    

    <div className=" border-2">
      
    </div>

    <div className="flex flex-row text-center justify-between w-34">
      <div className="pr-2 text-md font-medium">
        Sales for the last 7 days
      </div>
    </div>
    
  </div>
  );
}
