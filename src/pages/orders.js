import React, { useState } from "react";
import "../App.css";
import OrderCard from "../components/orderCard";

function Orders() {

    return (

      <div className="flex flex-row justify-between">
        <div className="lg:w-44 md:w-24 w-0 " />
          <div className="flex flex-col items-start py-16 w-full ">
            <div className="flex flex-row gap-4 bg-gray-100 w-full p-3">
              <h1 className="text-xl font-bold text-center">Orders</h1>
              <h1 className="text-xl font-bold text-center">Completed</h1>
              <h1 className="text-xl font-bold text-center">Canceled</h1>
            </div>
            <div className="flex flex-row gap-4 w-full pt-4">
              <div className="flex flex-col ">
                <OrderCard />
              </div>
            </div>
          </div>
        <div className="lg:w-44 md:w-24 w-0 " />
      </div>
          
    );
  
  }
  
  export default Orders;