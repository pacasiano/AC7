import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { myContext } from "../context/inventoryContext";

export default function AddItem() {
  
  const { setPage } = useContext(myContext);

  // category options
  const options = [
    {value: "Category 1", label: "Category 1"},
    {value: "Category 2", label: "Category 2"},
];

  return (
    <div className="px-8 py-8">
      <div className="flex flex-col gap-5">
        <div id="header" className="flex flex-row justify-between">
          <span className="text-xl font-bold">Add Item</span>
          <button
            onClick={() => setPage("inventory")}
            className="bg-gray-200 px-2 py-1 rounded-md font-medium"
          >
            Back
          </button>
        </div>
        <form action="/api/inventory_in" method="POST" className="flex flex-col gap-3">
        <table className="w-full border-collapse border">
            <thead>
                <tr className="bg-gray-400">
                <th className="text-md font-bold border p-2 text-white w-1/5" required>
                    Item Name
                </th>
                <th className="text-md font-bold border p-2 text-white w-1/5" required>
                    Description
                </th>
                <th className="text-md font-bold border p-2 text-white w-1/5" required>
                    Price
                </th>
                <th className="text-md font-bold border p-2 text-white w-1/5" required>
                    Category
                </th>
                <th className="text-md font-bold border p-2 text-white w-1/5" required>
                    Threshold
                </th>
                </tr>
            </thead>
            <tbody>
                <tr className="bg-gray-300">
                <td className="text-sm font-semibold border p-2">
                    <input name="supplier_name" className="w-full h-10 text-center" required />
                </td>
                <td className="text-sm font-semibold border p-2">
                    <input name="comments" type="text" className="w-full h-10 text-center" />
                </td>
                <td className="text-sm font-semibold border p-2">
                    <input name="payment_amount" type="number" className="w-full h-10 text-center" required></input>
                </td>
                <td className="text-sm font-semibold border p-2">
                    <Select options={options} className=" w-full  h-10 text-center" required />
                </td>
                <td className="text-sm font-semibold border p-2">
                    <input type="number" className=" w-full  h-10 text-center" required />
                </td>
                </tr>
            </tbody>
        </table>
            <div className="text-sm w-full flex justify-end font-semibold p-2">
                <button className="bg-green-600 p-3 w-44 rounded-xl text-white">SUBMIT</button>
            </div>
        </form>
        </div>
    </div>
  );
}