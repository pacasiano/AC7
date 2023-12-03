import React, { useState, useEffect } from 'react';
import "../App.css";
import OrderCard from "../components/orderCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { parse, format } from 'date-fns';

function getAcctIdFromCookie() { 
  const accountId = document.cookie
    .split("; ")
    .find((row) => row.startsWith("account_id="))
    ?.split("=")[1];
  return accountId;
}

function Orders() {

  const accountId = getAcctIdFromCookie();
  const [mode, setMode] = useState('ongoing');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`/api/orders/orders/${accountId}`)
      .then(res => res.json())
      .then((orders) => {
        console.log('Fetched orders:', orders);
        separatedOrders(orders);
        setOrders(orders);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, [accountId]);

  // Separate ongoing orders
  const [ongoing, setOngoing] = useState([]);
  const [complete, setComplete] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const [returned, setReturned] = useState([]);

function separatedOrders(orders) {
  let onGoing = [];
  let complete = [];
  let cancelled = [];
  let returned = [];

  for (let i = 0; i < orders.length; i++) {
    if (orders[i].sale_status === 'packaging' || orders[i].sale_status === 'shipped') {
      onGoing.push(orders[i]);
    } else if (orders[i].sale_status === 'complete') {
      complete.push(orders[i]);
    } else if (orders[i].sale_status === 'cancelled') {
      cancelled.push(orders[i]);
    } else if (orders[i].sale_status === 'returned') {
      returned.push(orders[i]);
    }
  }

  setOngoing(onGoing);
  console.log('Ongoing orders:', onGoing)
  setComplete(complete);
  console.log('Completed orders:', complete)
  setCancelled(cancelled);
  console.log('Cancelled orders:', cancelled)
  setReturned(returned);
  console.log('Returned orders:', returned)
}

    return (

      <div className="transition-all ease-in flex flex-row justify-between min-h-screen py-24 px-20">
        <div className="flex flex-row w-full gap-5">
          <div className="flex flex-col w-[100%] gap-5">

            <div className="flex flex-row">
              <button onClick={() => setMode("ongoing")} className={`${mode === "ongoing" ? "bg-gray-50" : "bg-gray-100 text-black/60"} transition-all hover:text-black hover:drop-shadow-md ${mode === "ongoing" && "shadow-md"} p-3 text-xl font-bold text-center w-1/3`}>Ongoing</button>
              <button onClick={() => setMode("complete")} className={`${mode === "complete" ? "bg-gray-50" : "bg-gray-100 text-black/60"} transition-all hover:text-black hover:drop-shadow-md ${mode === "complete" && "shadow-md"} p-3 text-xl font-bold text-center w-1/3`}>Completed</button>
              <button onClick={() => setMode("cancelled")} className={`${mode === "cancelled" ? "bg-gray-50" : "bg-gray-100 text-black/60"} transition-all hover:text-black hover:drop-shadow-md ${mode === "cancelled" && "shadow-md"} p-3 text-xl font-bold text-center w-1/3`}>Cancelled</button>
              <button onClick={() => setMode("returned")} className={`${mode === "returned" ? "bg-gray-50" : "bg-gray-100 text-black/60"} transition-all hover:text-black hover:drop-shadow-md ${mode === "returned" && "shadow-md"} p-3 text-xl font-bold text-center w-1/3`}>Returned</button>
            </div>

            {(ongoing.length === 0 && mode === "ongoing" ) && <div className="text-center text-lg bg-gray-100 py-5 font-semibold">No ongoing orders!</div>}
            {(complete.length === 0 && mode === "complete" ) && <div className="text-center text-lg bg-gray-100 py-5 font-semibold">No completed orders!</div>}
            {(cancelled.length === 0 && mode === "cancelled" ) && <div className="text-center text-lg bg-gray-100 py-5 font-semibold">No cancelled orders!</div>}
            {(returned.length === 0 && mode === "returned" ) && <div className="text-center text-lg bg-gray-100 py-5 font-semibold">No returned orders!</div>}

            {mode === "ongoing" && (
            ongoing.map((ongoing) => {
              return (
                <OrderCard
                  key={ongoing.sale_id}
                  sale_id={ongoing.sale_id}
                  sale_date={ongoing.sale_date}
                  sale_status={ongoing.sale_status}
                  shipped_date={ongoing.shipped_date}
                  received_date={ongoing.received_date}
                  total={ongoing.amount}
                />
              )
            }))}
            {mode === "complete" && (
            complete.map((complete) => {
              return (
                <OrderCard
                  key={complete.sale_id}
                  sale_id={complete.sale_id}
                  sale_date={complete.sale_date}
                  sale_status={complete.sale_status}
                  shipped_date={complete.shipped_date}
                  received_date={complete.received_date}
                  total={complete.amount}
                />
              )
            }))}
            {mode === "cancelled" && (
            cancelled.map((cancelled) => {
              return (
                <OrderCard
                  key={cancelled.sale_id}
                  sale_id={cancelled.sale_id}
                  sale_date={cancelled.sale_date}
                  sale_status={cancelled.sale_status}
                  shipped_date={cancelled.shipped_date}
                  received_date={cancelled.received_date}
                  total={cancelled.amount}
                />
              )
            }))}
            {mode === "returned" && (
            returned.map((returned) => {
              return (
                <OrderCard
                  key={returned.sale_id}
                  sale_id={returned.sale_id}
                  sale_date={returned.sale_date}
                  sale_status={returned.sale_status}
                  shipped_date={returned.shipped_date}
                  received_date={returned.received_date}
                  total={returned.amount}
                />
              )
            }))}
          </div>

          <div className="flex flex-col w-2/4">
            <div className="flex flex-col gap-5">
              <div className="bg-gray-100  py-3 text-xl font-bold text-start pl-5">
                User statistics
              </div>
              <div className="flex flex-col gap-5">

              <div className="flex flex-col text-white w-full gap-5 p-7 custom-gradient2 rounded-md">
                  <div className="flex flex-row justify-between">
                    <span className="text-xl font-bold">Total number of orders</span>
                    <div className="">
                      <FontAwesomeIcon icon={faCartShopping} size="2x" />
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center w-full" >
                    <div>
                      <span className="text-2xl">{ongoing.length + complete.length + cancelled.length}</span>
                    </div>
                  </div>
                </div>

                <DailyRevenue orders={orders} />
          
              </div>
            </div>
          </div>
        </div>
      </div>
          
    );
  
}

function DailyRevenue({orders}) {
 
  const today = new Date().toLocaleDateString();
  const dates = [];

  for (let i = 0; i < orders.length; i++) {
    dates.push({
      date: orders[i].sale_date,
      status: orders[i].sale_status
    });
  }

  const convertSaleDates = (dates) => {
    return dates.map((order, index) => {
      const { date, status } = order;
      
      if (date) {
        const parsedDate = parse(date, "MMMM dd, yyyy", new Date());
        const formattedDate = format(parsedDate, 'M/d/Y');
        return { date: formattedDate, status };
      } else {
        console.warn(`Sale date at index ${index} is missing or undefined:`, date);
        return null; // or handle the case when saleDate is missing
      }
    });
  };
  
  const formattedDates = convertSaleDates(dates);
  
  // Filter dates by today and status of "packaging" or "shipped"
  const filteredDates = formattedDates.filter(date => {
    return date && date.date === today && (date.status === 'packaging' || date.status === 'shipped');
  });
  

  return(
  <div className="flex flex-col text-white w-full gap-5 p-7 custom-gradient2 rounded-md">
    
    <div className="flex flex-row justify-between">
      <span className="text-xl font-bold">Product/s bought today</span>
      <div className="font-bold">
        <FontAwesomeIcon icon={faCartShopping} size="2x" />
      </div>
    </div>

    <div className="flex flex-row justify-between items-center w-full" >
      <div>
        <span className="text-2xl">{0+filteredDates.length}</span>
      </div>
    </div>

  </div>
  );
}
  
  export default Orders;