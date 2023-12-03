import React, { useState, useEffect, useContext } from 'react';
import "../App.css";
import Order from './ordersExpand';
import Select from "react-select";
import Check from "../imgs/check.png";
import { myContext } from '../context/adminContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { parse, format, subDays, isValid, isToday } from 'date-fns';


export default function Orders() {

    // const today = new Date().toLocaleDateString();

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [reloadData, setReloadData] = useState(false);
    const [shipped, setShipped] = useState(false);
    const [returned, setReturned] = useState(false);
    const [packed, setPacked] = useState(false);
    const [options, setOptions] = useState([])
    const [shippedSucces, setShippedSucces] = useState(false);
    const [selectedOrderToBeShipped, setSelectedOrderToBeShipped] = useState(null);
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
        <ShippedForm isModalOpen={shipped} setIsModalOpen={setShipped} setShippedSucces={setShippedSucces} selectedOrderToBeShipped={selectedOrderToBeShipped} />
        <Shipped isModalOpen={shippedSucces} setModalOpen={setShippedSucces} />
        <Returned isModalOpen={returned} setModalOpen={setReturned} />
        <Packed isModalOpen={packed} setModalOpen={setPacked} />
        <div className="h-screen px-8 pt-8">
            <div className="flex flex-col gap-5 ">
                <div id="header" className="flex flex-row justify-between">
                    <span className="text-xl font-bold">Orders</span>
                    <Select options={options} className="w-96" onChange={(selectedOption) => setSelectedOrder(selectedOption)} />
                </div>
                <div className="flex flex-row justify-start gap-5 w-full">
                  <DailySales orders={orders} />
                  <DailyRevenue orders={orders} />
                  <WeeklySales orders={orders} />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row justify-between bg-gray-200 w-full p-5">
                        <div>
                            <span className="text-md font-bold">Order List</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            {/* <button><span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">View All</span></button> */}
                            <button onClick={() => setPage("returned")}><span className=" text-md bg-gray-100 px-2 py-1 rounded-md font-bold">Return Request</span></button>
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
                            <Order key={order.sale_id} order={order} setReloadData={setReloadData} setShipped={setShipped} setPacked={setPacked} reloadData={reloadData} setSelectedOrderToBeShipped={setSelectedOrderToBeShipped} />
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
  
  function ShippedForm({isModalOpen, setIsModalOpen, setShippedSucces, selectedOrderToBeShipped}) {
      
    const [shippedForm, setShippedForm] = useState({
      tracknum: "",
      courrier: "",
      payment: "",
    });

    const handleChange = (e) => {
      setShippedForm({
        ...shippedForm,
        [e.target.name]: e.target.value,
      });
    }

    const handleSubmit = (e) => {
      e.preventDefault();

        console.log(selectedOrderToBeShipped)
        console.log(shippedForm);
        setIsModalOpen(false);
        setShippedSucces(true);

        // setReloadData(!reloadData);
    }

  
    return (
      <div className="fixed backdrop-blur-sm bg-black/20 drop-shadow-xl -ml-56 z-50">
        <Modal isOpen={isModalOpen}>
          <div className="h-screen w-screen flex justify-center items-center backdrop-blur-sm bg-white/30 ">
            <form onSubmit={handleSubmit} className="fixed bg-gray-100 pb-3 rounded-xl w-[40rem]">
                <div className="flex flex-col gap-5 text-center py-5 px-10">
                  <div className="text-2xl font-bold">
                    Product Shipment Form
                  </div>
                  <div className="flex flex-col gap-5">

                    <div className="flex flex-col gap-2">
                      <div className="text-md text-left font-bold">
                        Tracking number
                      </div>
                      <div>
                        <input name="tracknum" onChange={handleChange} className="w-full border-2 border-black/60 rounded-md p-2" required/>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="text-md text-left font-bold">
                        Courrier
                      </div>
                      <div>
                        <input name="courrier" onChange={handleChange} className="w-full border-2 border-black/60 rounded-md p-2 resize-none" required/>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="text-md text-left font-bold">
                        payment
                      </div>
                      <div>
                        <input name="payment" onChange={handleChange} className="w-full border-2 border-black/60 rounded-md p-2 resize-none" required/>
                      </div>
                    </div>

                    <div className="flex flex-row gap-1">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="bg-black/80 hover:bg-black text-gray-50 p-2 rounded-md w-1/2 font-medium">Cancel</button>
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

function DailySales({orders}) {

  const today = new Date().toLocaleDateString();
  const dates = [];

  for (let i = 0; i < orders.length; i++) {
    dates.push(orders[i].sale_date);
  }

  const convertSaleDates = (dates) => {
    return dates.map((saleDate, index) => {
      if (saleDate) {
        const parsedDate = parse(saleDate, "MMMM dd, yyyy '-' hh:mm:ss a", new Date());
        const formattedDate = format(parsedDate, 'M/d/Y');
        return formattedDate;
      } else {
        console.warn(`Sale date at index ${index} is missing or undefined:`, saleDate);
        return null; // or handle the case when saleDate is missing
      }
    });
  };
 
  const formattedDates = convertSaleDates(dates);
  const filteredDates = formattedDates.filter(date => date === today);
  console.log(filteredDates);

  return(
  <div className="flex flex-col text-white w-72 gap-5 p-7 custom-gradient rounded-md">
    
    <div className="flex flex-row justify-between">
      <span className="text-xl font-bold">Daily Sales</span>
      <div className="">
        <FontAwesomeIcon icon={faCartShopping} size="2x" />
      </div>
    </div>

    <div className="flex flex-row justify-between items-center w-full" >
      
      <div>
        <span className="text-2xl">{filteredDates.length}</span>
      </div>
    </div>

  </div>
  );
}

function WeeklySales({orders}) {

  const dates = [];

  for (let i = 0; i < orders.length; i++) {
    dates.push(orders[i].sale_date);
  }

  const convertSaleDates = (dates) => {
    return dates.map((saleDate, index) => {
      if (saleDate) {
        const parsedDate = parse(saleDate, "MMMM dd, yyyy '-' hh:mm:ss a", new Date());
        const formattedDate = format(parsedDate, 'M/d/Y');
        
        // Check if the date is within the last 7 days
        const isWithin7Days = subDays(new Date(), 7) <= parsedDate && parsedDate <= new Date();
  
        // Append time if the date is within the last 7 days, otherwise, return only the date
        return isWithin7Days ? `${formattedDate} - ${format(parsedDate, 'hh:mm:ss a')}` : formattedDate;
      } else {
        console.warn(`Sale date at index ${index} is missing or undefined:`, saleDate);
        return null; // or handle the case when saleDate is missing
      }
    });
  };
  
  const formattedDates = convertSaleDates(dates);
  console.log(formattedDates);

  return(
  <div className="flex flex-col text-white w-72 gap-5 p-7 custom-gradient rounded-md">
    
    <div className="flex flex-row justify-between">
      <span className="text-xl font-bold">Weekly Sales</span>
      <div className="">
        <FontAwesomeIcon icon={faCartShopping} size="2x" />
      </div>
    </div>

    <div className="flex flex-row justify-between items-center w-full" >
      
      <div>
        <span className="text-2xl">{formattedDates.length}</span>
      </div>
    </div>

  </div>
  );
}

function DailyRevenue({orders}) {
 
  // select all dates that are today and get the total price
  const convertSaleDates = (orders) => {
  
    const filteredSales = orders.filter((order) => {
      const parsedDate = parse(order.sale_date, "MMMM dd, yyyy '-' hh:mm:ss a", new Date(), {
        additionalDigits: 2,
      });
      return isValid(parsedDate) && isToday(parsedDate);
    });
  
    const totalSalesPrice = filteredSales.reduce((total, order) => total + parseFloat(order.price), 0);
  
    return {
      filteredSales,
      totalSalesPrice,
    };
  };
  
  // Example usage
  const { filteredSales, totalSalesPrice } = convertSaleDates(orders);
  console.log('Filtered Sales:', filteredSales);
  console.log('Total Sales Price:', totalSalesPrice);
  

  return(
  <div className="flex flex-col text-white w-72 gap-5 p-7 custom-gradient2 rounded-md">
    
    <div className="flex flex-row justify-between">
      <span className="text-xl font-bold">Daily Revenue</span>
      <div className="text-3xl -mt-2 font-bold">
        ₱
      </div>
    </div>

    <div className="flex flex-row justify-between items-center w-full" >
      
      <div>
        <span className="text-2xl">₱ {totalSalesPrice}</span>
      </div>
    </div>

  </div>
  );
}


