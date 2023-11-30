import React, { useState, useEffect } from 'react';
import "../App.css";
import OrderCard from "../components/orderCard";

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

  useEffect(() => {
    fetch(`/api/orders/orders/${accountId}`)
      .then(res => res.json())
      .then((orders) => {
        console.log('Fetched orders:', orders);
        separatedOrders(orders);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, [accountId]);

  // Separate ongoing orders
  const [ongoing, setOngoing] = useState([]);
  const [complete, setComplete] = useState([]);
  const [cancelled, setCancelled] = useState([]);

function separatedOrders(orders) {
  let onGoing = [];
  let complete = [];
  let cancelled = [];

  for (let i = 0; i < orders.length; i++) {
    if (orders[i].sale_status === 'packaging' || orders[i].sale_status === 'shipped') {
      onGoing.push(orders[i]);
    } else if (orders[i].sale_status === 'complete') {
      complete.push(orders[i]);
    } else if (orders[i].sale_status === 'cancelled') {
      cancelled.push(orders[i]);
    }
  }

  setOngoing(onGoing);
  console.log('Ongoing orders:', onGoing)
  setComplete(complete);
  console.log('Completed orders:', complete)
  setCancelled(cancelled);
  console.log('Cancelled orders:', cancelled)
}

    return (

      <div className="flex flex-row justify-between min-h-screen py-24 px-20">
        <div className="flex flex-row w-full gap-5">
          <div className="flex flex-col w-[70%] gap-5">

            <div className="flex flex-row">
              <button onClick={() => setMode("ongoing")} className={`${mode === "ongoing" ? "bg-gray-50" : "bg-gray-100 text-black/60"} hover:text-black hover:drop-shadow-md ${mode === "ongoing" && "shadow-md"} p-3 text-xl font-bold text-center w-1/3`}>Ongoing</button>
              <button onClick={() => setMode("complete")} className={`${mode === "complete" ? "bg-gray-50" : "bg-gray-100 text-black/60"} hover:text-black hover:drop-shadow-md ${mode === "complete" && "shadow-md"} p-3 text-xl font-bold text-center w-1/3`}>Completed</button>
              <button onClick={() => setMode("cancelled")} className={`${mode === "cancelled" ? "bg-gray-50" : "bg-gray-100 text-black/60"} hover:text-black hover:drop-shadow-md ${mode === "cancelled" && "shadow-md"} p-3 text-xl font-bold text-center w-1/3`}>Cancelled</button>
            </div>

            {(ongoing.length === 0 && mode === "ongoing" ) && <div className="text-center text-lg bg-gray-100 py-5 font-semibold">No ongoing orders!</div>}
            {(complete.length === 0 && mode === "complete" ) && <div className="text-center text-lg bg-gray-100 py-5 font-semibold">No completed orders!</div>}
            {(cancelled.length === 0 && mode === "cancelled" ) && <div className="text-center text-lg bg-gray-100 py-5 font-semibold">No cancelled orders!</div>}

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
          </div>

          <div className="flex flex-col w-2/4">
            <div className="flex flex-col gap-5">
              <div className="bg-gray-100  py-3 text-xl font-bold text-start pl-5">
                User statistics
              </div>
              <div className="flex flex-col gap-5">

                <div className="flex flex-row justify-center items-center bg-gradient-to-l to-gray-100 from-gray-400 rounded-md">
                  <div className="pr-2 text-md font-medium">
                    Total number of orders
                  </div>
                  <div className="text-[5rem] font-black">
                    {ongoing.length + complete.length + cancelled.length}
                  </div>
                </div>
          
              </div>
            </div>
          </div>
        </div>
      </div>
          
    );
  
}
  
  export default Orders;