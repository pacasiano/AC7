import React from "react";
import "../App.css";

export default function Orders() {

    const today = new Date().toLocaleDateString();

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
                            <button><span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">Veiw All</span></button>
                        </div>
                    </div>
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-400">
                                <th className="text-sm font-semibold border p-2 text-white">Order ID</th>
                                <th className="text-sm font-semibold border p-2 text-white">User ID</th>
                                <th className="text-sm font-semibold border p-2 text-white">Product ID</th>
                                <th className="text-sm font-semibold border p-2 text-white">Address</th>
                                <th className="text-sm font-semibold border p-2 text-white">Date</th>
                                <th className="text-sm font-semibold border p-2 text-white">Status</th>
                                <th className="text-sm font-semibold border p-2 text-white">Quantity</th>
                                <th className="text-sm font-semibold border p-2 text-white">Total</th>
                                <th className="text-sm font-semibold border p-2 text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-300">
                                <td className="text-sm font-semibold border p-2">12341234</td>
                                <td className="text-sm font-semibold border p-2">1323123</td>
                                <td className="text-sm font-semibold border p-2">4842983</td>
                                <td className="text-sm font-semibold border p-2">Davao City</td>
                                <td className="text-sm font-semibold border p-2">{today}</td>
                                <td className="text-sm font-semibold border p-2">Paid</td>
                                <td className="text-sm font-semibold border p-2">1</td>
                                <td className="text-sm font-semibold border p-2">P99.00</td>
                                <td className="flex flex-row gap-2 text-sm font-semibold border p-2 ">
                                <button className="bg-green-500 text-white px-4 py-2 w-full rounded">EDIT</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>   
        </div>
    );
};