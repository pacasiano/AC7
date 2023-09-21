import React, { useState } from "react";
import "../App.css";
import OrderCard from "../components/orderCard";

function Orders() {

    return (

      <div className="flex flex-row justify-between h-screen">
        <div className="lg:w-44 md:w-24 w-0 " />
          <div className="flex flex-col items-start py-16 w-full ">
            <div className="flex flex-row gap-4 w-full">
              <div className="flex flex-col W-1/3 gap-5">
                <div className="bg-gray-200 p-3">
                  <button className="text-xl font-bold text-center">Orders</button>
                </div>
                  <OrderCard />
              </div>
              <div className="flex flex-col W-1/3 gap-5">
                <div className="bg-gray-200 p-3">
                  <button className="text-xl font-bold text-center">Completed</button>
                </div>
                <OrderCard />
              </div>
              <div className="flex flex-col W-1/3 gap-5">
                <div className="bg-gray-200 p-3">
                  <button className="text-xl font-bold text-center">Canceled</button>
                </div>
                <OrderCard />
              </div>

          </div>
        </div>
      </div>
          
    );
  
  }
  
  export default Orders;