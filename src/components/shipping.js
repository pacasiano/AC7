import React from "react";
import "../App.css";
import Select from "react-select";

export default function Shipping() {

    const options = [
    { value: 'All', label: 'All' },
    ];  

    return(
        <div className="h-screen px-8 pt-8">
            <div className="flex flex-col gap-5 ">
                <div id="header" className="flex flex-row justify-between">
                    <span className="text-xl font-bold">Shipment</span>
                    <Select options={options} className="w-96" />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row justify-between bg-gray-200 w-full p-5">
                        <div>
                            <span className="text-md font-bold">Delivery List</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            {/* <button><span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">View All</span></button> */}
                        </div>
                    </div>
                    <div className="max-h-[560px] overflow-auto">
                        <table className="w-full border-collapse border">
                            <thead>
                                <tr className="bg-gray-400">
                                    <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Shipment ID</th>
                                    <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Purchase ID</th>
                                    <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Address</th>
                                    <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Tracking Number</th>
                                    <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Courier</th>
                                    <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Date Sent</th>
                                    <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Date Received</th>
                                    <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Status</th>
                                    <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-300">
                                    <td className="text-sm font-semibold border p-2">12341234</td>
                                    <td className="text-sm font-semibold border p-2">1323123</td>
                                    <td className="text-sm font-semibold border p-2">Davao City</td>
                                    <td className="text-sm font-semibold border p-2">843823u442</td>
                                    <td className="text-sm font-semibold border p-2">J&T</td>
                                    <td className="text-sm font-semibold border p-2">Aug 1, 2023</td>
                                    <td className="text-sm font-semibold border p-2">n/a</td>
                                    <td className="text-sm font-semibold border p-2">Delivery in Progress</td>
                                    <td className="flex flex-row gap-2 text-sm font-semibold border p-2 ">
                                    <button className="bg-green-500 text-white px-4 py-2 w-full rounded">EDIT</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>   
        </div>
    );
};