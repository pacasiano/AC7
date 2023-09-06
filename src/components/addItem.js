import React from "react"
import "../App.css"

export default function AddItem() {
    return(
        <div className="h-screen px-8 pt-8">
            <div className="flex flex-col gap-5 ">
                <div id="header" className="flex flex-row justify-start">
                    <span className="text-xl font-bold">Add Item</span>
                </div>
                <div className="flex flex-col gap-3">
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-400">
                                <th className="text-sm font-semibold border p-2 text-white">Order ID</th>
                                <th className="text-sm font-semibold border p-2 text-white">User ID</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-300">
                                <td className="text-sm font-semibold border p-2">12341234</td>
                                <td className="text-sm font-semibold border p-2">1323123</td>
                                
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>   
        </div>
    );
}