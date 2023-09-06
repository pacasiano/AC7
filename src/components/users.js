import React, { useState } from "react";
import "../App.css";

export default function Users() {

    const[account, setAccount]= useState("customer");

    return(
        <div className="h-screen px-8 pt-8">
            <div className="flex flex-col gap-5 ">
                <div id="header" className="flex flex-row justify-start">
                    <span className="text-xl font-bold">Accounts</span>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row justify-between bg-gray-200 w-full p-5">
                        <div>
                            {account==="customer" ? (
                                <span className="text-md font-bold">User List</span>
                                ) : (
                                <span className="text-md font-bold">Employee List</span>
                                )
                            }
                            
                        </div>
                        <div className="flex flex-row gap-2">
                            {account==="customer" ? (
                            <button onClick={()=> setAccount("employee")}><span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">View Emp Accounts</span></button>
                            ) : (
                            <button onClick={()=> setAccount("customer")}><span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">View User Accounts</span></button>  
                            )}
                            {account==="employee" && (
                            <button><span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">Add</span></button>
                            )}
                            <button><span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">Veiw All</span></button>
                        </div>
                    </div>
                    {account==="customer" ? (
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-400">
                                <th className="text-sm font-semibold border p-2 text-white">User ID</th>
                                <th className="text-sm font-semibold border p-2 text-white">First Name</th>
                                <th className="text-sm font-semibold border p-2 text-white">Last Name</th>
                                <th className="text-sm font-semibold border p-2 text-white">Address</th>
                                <th className="text-sm font-semibold border p-2 text-white">Contact</th>
                                <th className="text-sm font-semibold border p-2 text-white">Email</th>
                                <th className="text-sm font-semibold border p-2 text-white">Reputation</th>
                                <th className="text-sm font-semibold border p-2 text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-300">
                                <td className="text-sm font-semibold border p-2">12341234</td>
                                <td className="text-sm font-semibold border p-2">Juan</td>
                                <td className="text-sm font-semibold border p-2">Dela Cruz</td>
                                <td className="text-sm font-semibold border p-2">Manila City</td>
                                <td className="text-sm font-semibold border p-2">09123456789</td>
                                <td className="text-sm font-semibold border p-2">junjun@gmail.com</td>
                                <td className="text-sm font-semibold border p-2">1  </td>
                                <td className="flex flex-row gap-2 text-sm font-semibold border p-2 ">
                                <button className="bg-green-500 text-white px-4 py-2 w-full rounded">EDIT</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    ) : (
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-400">
                                <th className="text-sm font-semibold border p-2 text-white">Employee ID</th>
                                <th className="text-sm font-semibold border p-2 text-white">First Name</th>
                                <th className="text-sm font-semibold border p-2 text-white">Last Name</th>
                                <th className="text-sm font-semibold border p-2 text-white">Position</th>
                                <th className="text-sm font-semibold border p-2 text-white">Emp_Status</th>
                                <th className="text-sm font-semibold border p-2 text-white">Contact Info</th>
                                <th className="text-sm font-semibold border p-2 text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-300">
                                <td className="text-sm font-semibold border p-2">12341234</td>
                                <td className="text-sm font-semibold border p-2">Juan</td>
                                <td className="text-sm font-semibold border p-2">Dela Cruz</td>
                                <td className="text-sm font-semibold border p-2">Owner</td>
                                <td className="text-sm font-semibold border p-2">Active</td>
                                <td className="text-sm font-semibold border p-2">junjun@gmail.com</td>
                                <td className="flex flex-row gap-2 text-sm font-semibold border p-2 ">
                                <button className="bg-green-500 text-white px-4 py-2 w-full rounded">EDIT</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    ) }
                </div>
            </div>   
        </div>
    );
};