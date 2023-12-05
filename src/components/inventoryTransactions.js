import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { myContext } from "../context/adminContext";

export default function InventoryTransactions() {
  
  const { setPage } = useContext(myContext);
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // category options
//   const options = [
//     {value: "Category 1", label: "Category 1"},
//     {value: "Category 2", label: "Category 2"},
//     ];

  return (
    <div className="px-8 py-8">
      <div className="flex flex-col gap-5">
        <div id="header" className="flex flex-row justify-between">
          <span className="text-xl font-bold">Inventory Transactions</span>
          <button
            onClick={() => setPage("inventory")}
            className="bg-gray-200 px-2 py-1 rounded-md font-medium"
          >
            Back
          </button>
        </div>
        <table className="w-full border-collapse border">
            <thead>
                <tr className="bg-gray-400">
                    <th className="text-sm font-semibold border p-2 text-white">Inventory in/out ID</th>
                    <th className="text-sm font-semibold border p-2 text-white">Supplier/Employee ID</th>
                    <th className="text-sm font-semibold border p-2 text-white">Description</th>
                    <th className="text-sm font-semibold border p-2 text-white">Payment Amount</th>
                    <th className="text-sm font-semibold border p-2 text-white">Date Ordered</th>
                    <th className="text-sm font-semibold border p-2 text-white">Date Delivered</th>
                    <th className="text-sm font-semibold border p-2 text-white">Actions</th>
                </tr>
            </thead>
            <tbody>
                {/* {products.map((product) => ( */}
                    <tr className="bg-gray-300">
                        <td className="text-sm font-semibold border p-2">{234}</td>
                        <td className="text-sm font-semibold border p-2">{43}</td>
                        <td className="text-sm font-semibold border p-2">{34.34}</td>
                        <td className="text-sm font-semibold border p-2">{34.34}</td>
                        <td className="text-sm font-semibold border p-2">&#x20B1;{34.34}</td>
                        <td className="text-sm font-semibold border p-2">{34.34}</td>
                        <td className="text-sm font-semibold border p-2 w-1/6"><button onClick={toggleExpand} className="w-full bg-blue-400 h-10 rounded-md">{isExpanded ? 'COLLAPSE' : 'EXPAND'}</button></td>
                    </tr>
                {isExpanded && (
                    <tr className="bg-slate-100 border-collapse border">
                        <td colSpan={8}>
                            {/* ito yung mag ulit */}
                            <div className="flex flex-row justify-evenly">
                            <div className="text-sm font-semibold p-2 text-black">Item Id</div>
                            <div className="text-sm font-semibold p-2 text-black">Quantity</div>
                            <div className="text-sm font-semibold p-2 text-black">Price</div>
                            </div>
                            {/* dito mag end */}
                        </td>
                    </tr>
                )}
                {/* ))} */}
            </tbody>
            </table>
        </div>
    </div>
  );
}