import React from "react";
import "../App.css";

export default function Inventory() {

    return(
        <div className="h-screen px-8 pt-8">
            <div className="flex flex-col gap-5 ">
                <div id="header" className="flex flex-row justify-start">
                    <span className="text-xl font-bold">Inventory</span>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row justify-between bg-gray-200 w-full p-5">
                        <div>
                            <span className="text-md font-bold">Product List</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            <button><span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">View Transactions</span></button>
                            <button><span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">Add Item</span></button>
                            <button><span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">Veiw All</span></button>
                        </div>
                    </div>
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-400">
                                <th className="text-sm font-semibold border p-2 text-white">Product ID</th>
                                <th className="text-sm font-semibold border p-2 text-white">Name</th>
                                <th className="text-sm font-semibold border p-2 text-white">Description</th>
                                <th className="text-sm font-semibold border p-2 text-white">Category</th>
                                <th className="text-sm font-semibold border p-2 text-white">Price</th>
                                <th className="text-sm font-semibold border p-2 text-white">Threshold</th>
                                <th className="text-sm font-semibold border p-2 text-white">Quantity</th>
                                <th className="text-sm font-semibold border p-2 text-white">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-300">
                                <td className="text-sm font-semibold border p-2">12341234</td>
                                <td className="text-sm font-semibold border p-2">Beauty Pill</td>
                                <td className="text-sm font-semibold border p-2">Description</td>
                                <td className="text-sm font-semibold border p-2">Pills</td>
                                <td className="text-sm font-semibold border p-2">P99.00</td>
                                <td className="text-sm font-semibold border p-2">10</td>
                                <td className="text-sm font-semibold border p-2">100</td>
                                <td className="flex flex-row gap-2 text-sm font-semibold border p-2 ">
                                <button className="bg-green-500 text-white px-4 py-2 w-full rounded">ADD</button>
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