import React, { useState } from "react"
import { useForm } from "react-hook-form";
import "../App.css"

export default function InventoryIn() {

    const [numbersToBeDelivered, setNumbersToBeDelivered] = useState(1);

    // Function to handle changes in the input field
    const handleInputChange = (event) => {
        if(Number(event.target.value) < 1 || Number(event.target.value) > 100){
            alert("Please enter a number between 0 and 100");
            return;
        };
      setNumbersToBeDelivered(Number(event.target.value));
    };
  


    return(
        <div className=" px-8 py-8 ">
            <div className="flex flex-col gap-5 ">
                <div id="header" className="flex flex-row justify-start">
                    <span className="text-xl font-bold">Inventory In</span>
                </div>
                <div className="flex flex-col gap-3">
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-400">
                                <th className="text-md font-bold border p-2 text-white">Supplier Name</th>
                                <th className="text-md font-bold border w-60 p-2 text-white">Payment</th>
                                <th className="text-md font-bold border p-2 text-white w-44">Number of Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-300">
                                <td className="text-sm font-semibold border p-2">
                                    <select name="supplierName" className="w-full text-center bg-gray-300 border-b-2 border-gray-400 pt-2 pl-1">
                                        {/*Iterate the Suppliers here*/}
                                        <option value="1">Supplier 1</option>
                                    </select></td>
                                <td className="text-sm font-semibold border p-2">
                                    <input name="amount" type="number" className="w-full text-center bg-gray-300 border-b-2 border-gray-400 pt-2 pl-1"></input></td>
                                <td className="text-sm font-semibold border p-2">
                                    <select className=" w-full text-center bg-gray-300 border-b-2 border-gray-400 pt-2 pl-1" value={numbersToBeDelivered} onChange={handleInputChange}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">5</option>
                                        <option value="7">6</option>
                                        <option value="8">7</option>
                                        <option value="9">8</option>
                                        <option value="10">9</option>
                                        <option value="11">10</option>
                                        <option value="12">12</option>
                                        <option value="13">13</option>
                                        <option value="14">14</option>
                                        <option value="15">15</option>
                                        <option value="16">16</option>
                                        <option value="17">17</option>
                                        <option value="18">18</option>
                                        <option value="19">19</option>
                                        <option value="20">20</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex flex-col gap-3">
                        <span className="text-xl font-bold ">Items</span>
                        <table className="w-full border-collapse border">
                            <thead className="bg-gray-400">
                                <tr>
                                    <th className="text-sm font-semibold border p-2 text-white">Item Name</th>
                                    <th className="text-sm w-44 font-semibold border p-2 text-white">Quantity</th>
                                </tr>
                            </thead>
                                {Array.from({ length: numbersToBeDelivered }, (_, index) => (
                                    <Items key={index} />
                                ))}
                        </table>
                        <table className="w-full border-0 border-collapse">
                            <thead>
                                <tr>
                                    <th className="text-sm font-semibold p-2"></th>
                                    <th className="text-sm w-44 font-semibold p-2"><button className="bg-green-600 p-3 w-full rounded-xl text-white">SUBMIT</button></th>
                                </tr>
                            </thead>
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
                    <select name="item" className="h-10 w-full text-center bg-gray-200 border-b-2 border-gray-400 pt-2 pl-1">
                        {/*Iterate the Items here*/}
                        <option value="1">Item 1</option>    
                    </select></td>
                <td className="text-sm font-semibold border p-2 text-black">
                    <input name="quantity" type="number" className="h-10 w-full text-center bg-gray-200 border-b-2 border-gray-400 pt-2 pl-1"></input></td>
            </tr>
        </tbody>

    )
}