import React, { useState, useEffect, useContext } from "react";
import { myContext } from "../context/adminContext";

export default function AddEmployee() {
  
  const { setPage } = useContext(myContext);


  return (
    <div className="px-8 py-8">
      <div className="flex flex-col gap-5">
        <div id="header" className="flex flex-row justify-between">
          <span className="text-xl font-bold">Add Employee Account</span>
          <button
            onClick={() => setPage("users")}
            className="bg-gray-200 px-2 py-1 rounded-md font-medium"
          >
            Back
          </button>
        </div>
        <form action="/api/product" method="POST" className="flex flex-col gap-3">

            {/* ACC INFO */}
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-400">
                    <th className="text-md font-bold border p-2 text-white w-1/5" >
                        Username
                    </th>
                    <th className="text-md font-bold border p-2 text-white w-1/5" >
                        Password
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-gray-300">
                    <td className="text-sm font-semibold border p-2">
                        <input name="username" className="w-full h-10 text-center" required />
                    </td>
                    <td className="text-sm font-semibold border p-2">
                        <input name="password" type="text" className="w-full h-10 text-center" required/>
                    </td>
                    </tr>
                </tbody>
            </table>

            {/* EMPLOYEE INFO */}
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-400">
                    <th className="text-md font-bold border p-2 text-white w-1/5" >
                        First name
                    </th>
                    <th className="text-md font-bold border p-2 text-white w-1/5" >
                        Middle name
                    </th>
                    <th className="text-md font-bold border p-2 text-white w-1/5" >
                        Last name
                    </th>
                    <th className="text-md font-bold border p-2 text-white w-1/5" >
                        Position
                    </th>
                    <th className="text-md font-bold border p-2 text-white w-1/5" >
                        Contact info
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-gray-300">
                    <td className="text-sm font-semibold border p-2">
                        <input name="first_name" className="w-full h-10 text-center" required />
                    </td>
                    <td className="text-sm font-semibold border p-2">
                        <input name="middle_name" type="text" className="w-full h-10 text-center" />
                    </td>
                    <td className="text-sm font-semibold border p-2">
                        <input name="last_name" type="text" className="w-full h-10 text-center" required/>
                    </td>
                    <td className="text-sm font-semibold border p-2">
                        <input name="position" type="text" className="w-full h-10 text-center" required/>
                    </td>
                    <td className="text-sm font-semibold border p-2">
                        <input name="contact_info" type="text" className="w-full h-10 text-center" required/>
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