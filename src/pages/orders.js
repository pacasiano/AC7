import React, { useState, useEffect } from 'react';
import "../App.css";
import { Link } from "react-router-dom";
import OnGoing from "../components/orderCard";
import Comp from "../components/orderCardcomp";


function Orders() {
    return (

      <div className="flex flex-row justify-between h-screen pt-16 px-20">
        <div className="" />
          <div className="flex flex-col items-start py-16 w-full ">
            <div className="flex flex-row gap-4 w-full">
              <div className="flex flex-col w-1/3 gap-5">
                <div className="bg-gray-100 p-3">
                  <button className="text-xl font-bold text-center">Orders</button>
                </div>
                  <OnGoing/>
              </div>
              <div className="flex flex-col w-1/3 gap-5">
                <div className="bg-gray-100 p-3">
                  <button className="text-xl font-bold text-center">Completed</button>
                </div>
                  <Comp/>
                
              </div>
              <div className="flex flex-col w-1/3 gap-5">
                <div className="bg-gray-100 p-3 ">
                  <button className="text-xl font-bold text-center">Cancelled</button>
                </div>
                
              </div>

          </div>
        </div>
      </div>
          
    );
  
  }
  
  export default Orders;