import React, { useState } from "react"
import "../App.css"

export default function InventoryIn() {

    const [numbersToBeDelivered, setNumbersToBeDelivered] = useState(1);

    // Function to handle changes in the input field
    const handleInputChange = (event) => {
      setNumbersToBeDelivered(Number(event.target.value));
    };
  


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
                                <th className="text-sm font-semibold border p-2 text-white">Supplier Name</th>
                                <th className="text-sm font-semibold border p-2 text-white">Contact Info</th>
                                <th className="text-sm font-semibold border p-2 text-white w-32">Number of Items delivered</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-300">
                                <td className="text-sm font-semibold border p-2">
                                    <input className="h-10 w-full pl-1"></input></td>
                                <td className="text-sm font-semibold border p-2">
                                    <input className="h-10 w-full pl-1"></input></td>
                                <td className="text-sm font-semibold border p-2">
                                    <input className="h-10 w-full pl-1" value={numbersToBeDelivered} onChange={handleInputChange}></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <table className="w-full border-collapse border">
                            <thead className="bg-gray-400">
                                <tr>
                                    <th className="text-sm font-semibold border p-2 text-white">Item Name</th>
                                    <th className="text-sm font-semibold border p-2 text-white">Quantity</th>
                                </tr>
                            </thead>
                                {Array.from({ length: numbersToBeDelivered }, (_, index) => (
                                    <Items key={index} />
                                ))}
                        </table>
                    </div>        
                </div>
            </div>   
        </div>
    );
}

function Items() {
    return(
        <tbody className="bg-gray-200">
            <tr>
                <td className="text-sm font-semibold border p-2 text-black">
                    <input className="h-10   w-full pl-1"></input></td>
                <td className="text-sm font-semibold border p-2 text-black">
                    <input className="h-10 w-full pl-1"></input></td>
            </tr>
        </tbody>

    )
}