import React, { useState, useEffect } from 'react';
import "../App.css";
import {Complete, OnGoing} from "../components/orderCard";

function getAcctIdFromCookie() { 
  const accountId = document.cookie
    .split("; ")
    .find((row) => row.startsWith("account_id="))
    ?.split("=")[1];
  return accountId;
}

function Orders() {

  const accountId = getAcctIdFromCookie();

  useEffect(() => {
    fetch(`/api/orders/orders/${accountId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
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

      <div className="flex flex-row justify-between min-h-screen pt-16 px-20">
        <div className="" />
          <div className="flex flex-col items-start py-16 w-full ">
            <div className="flex flex-row gap-5 w-full">

                <div className="flex flex-col w-1/2 gap-5">
                  <div className="bg-gray-100 p-3">
                    <div className="text-xl font-bold text-start">Ongoing</div>
                  </div>
                  {ongoing.length === 0 && <div className="text-center text-lg bg-gray-100 py-5 font-semibold">No ongoing orders!</div>}
                  {ongoing.map((ongoing) => {
                    return (
                      <OnGoing
                        key={ongoing.sale_id}
                        sale_id={ongoing.sale_id}
                        sale_date={ongoing.sale_date}
                        sale_status={ongoing.sale_status}
                        name={ongoing.name}
                        quantity={ongoing.quantity}

                      />
                    )
                  })}
                </div>

                <div className="flex flex-row w-1/2 gap-5">

                <div className="flex flex-col w-1/2 gap-5">
                  <div className="bg-gray-100 p-3">
                    <div className="text-xl font-bold text-start">Completed</div>
                  </div>
                  {complete.length === 0 && <div className="text-center text-lg bg-gray-100 py-5 font-semibold">No Completed orders!</div>}
                  {complete.map((complete) => {
                    return (
                      <Complete
                        key={complete.sale_id}
                        sale_id={complete.sale_id}
                        sale_date={complete.sale_date}
                        sale_status={complete.sale_status}
                        // received_date={complete.received_date}
                        total={complete.total}
                      />
                    )
                  })}
                </div>
              

              <div className="flex flex-col w-1/2 gap-5">
                <div className="bg-gray-100 p-3 ">
                  <div className="text-xl font-bold text-start">Cancelled</div>
                </div>
                {cancelled.length === 0 && <div className="text-center text-lg bg-gray-100 py-5 font-semibold">No Cancelled orders!</div>}
                {cancelled.map((cancelled) => {
                  return (
                    <Complete
                      key={cancelled.sale_id}
                      sale_id={cancelled.sale_id}
                      sale_date={cancelled.sale_date}
                      sale_status={cancelled.sale_status}
                      // received_date={cancelled.received_date}
                      total={cancelled.total}
                    />
                  )
                })}
              </div>

              </div>

          </div>
        </div>
      </div>
          
    );
  
}
  
  export default Orders;