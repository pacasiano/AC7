import React, { useState, useEffect } from 'react';
import "../App.css";
import Order from './ordersExpand';

export default function Orders() {

    // const today = new Date().toLocaleDateString();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('/api/orders')
            .then((res) => res.json())
            .then((orders) => {
                setOrders(orders);
            });
    }, []);

    console.log(orders)

    return(
        <div className="h-screen px-8 pt-8">
            <div className="flex flex-col gap-5 ">
                <div id="header" className="flex flex-row justify-start">
                    <span className="text-xl font-bold">Orders</span>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row justify-between bg-gray-200 w-full p-5">
                        <div>
                            <span className="text-md font-bold">Order List</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            <button><span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">View All</span></button>
                        </div>
                    </div>
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-400">
                                <th className="text-sm font-semibold border p-2 text-white">Order ID</th>
                                <th className="text-sm font-semibold border p-2 text-white">User ID</th>
                                {/* <th className="text-sm font-semibold border p-2 text-white">Product ID</th> */}
                                <th className="text-sm font-semibold border p-2 text-white">Address ID</th>
                                <th className="text-sm font-semibold border p-2 text-white">Date</th>
                                <th className="text-sm font-semibold border p-2 text-white">Status</th>
                                {/* <th className="text-sm font-semibold border p-2 text-white">Quantity</th> */}
                                <th className="text-sm font-semibold border p-2 text-white">Total</th>
                                <th className="text-sm font-semibold border p-2 text-white">Actions</th>
                            </tr>
                        </thead>
                        {orders.map((order) => (
                        <Order key={order.sale_id} order={order} />
                        ))}
                    </table>

                </div>
            </div>   
        </div>
    );
};