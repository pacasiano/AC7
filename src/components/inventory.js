import React, { useState , useContext } from "react";
import { myContext } from "../context/inventoryContext";
import "../App.css";

export default function Inventory() {

    const [addItem, showAddItem] = useState(false);
    const [editItem, showEditItem] = useState(false);

    const { setPage } = useContext(myContext) 

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
                            <button onClick={() => setPage("inventoryIn")}><span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">Add Item</span></button>
                            <button><span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">View All</span></button>
                        </div>
                    </div>
    
                    {editItem && (
                        EditItem()
                    )}
                    {addItem && (
                        AddItem()
                    )}

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
                                {addItem === false ? (
                                <button onClick={() => showAddItem(!addItem)} className="bg-green-500 text-white px-4 py-2 w-full rounded">ADD</button>
                                ) : (
                                <button onClick={() => showAddItem(!addItem)} className="bg-red-500 text-white px-4 py-2 w-full rounded">CANCEL</button>
                                )}
                                {editItem === false ? (
                                <button onClick={() => showEditItem(!editItem)} className="bg-green-500 text-white px-4 py-2 w-full rounded">EDIT</button>
                                ) : (
                                <button onClick={() => showEditItem(!editItem)} className="bg-red-500 text-white px-4 py-2 w-full rounded">CANCEL</button>
                                )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>   
        </div>
    );
};

function EditItem() {
    
    return (<form>
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-300">
                            <th className="text-sm font-semibold border p-2">
                                <span for="name" className="flex justify-start font-bold">Name</span>
                                <input id="name" className="w-full  pl-1 rounded-md "></input></th>
                            <th className="text-sm font-semibold border p-2">
                                <span for="desc" className="flex justify-start font-bold">Description</span>
                                <input id="desc" className="w-full  rounded-md "></input></th>
                            <th className="text-sm font-semibold border p-2">
                                <span for="cat" className="flex justify-start font-bold">Category</span>
                                <input id="cat" className="w-full rounded-md "></input></th>
                            <th className="text-sm font-semibold border p-2">
                                <span for="price" className="flex justify-start font-bold">Price</span>
                                <input id="price" className="w-full rounded-md "></input></th>
                            <th className="text-sm font-semibold border p-2">
                                <span for="tres" className="flex justify-start font-bold">Threshold</span>
                                <input id="tres" className="w-full rounded-md "></input></th>
                            <th className="text-sm font-semibold border p-2">
                                <span for="quan" className="flex justify-start font-bold">Quantity</span>
                                <input id="quan" className="w-full rounded-md "></input></th>
                            <th className="text-md font-semibold border p-2">
                                <button type="submit" className="w-full h-full bg-gray-100 px-2 py-1 font-bold rounded-md ">Submit</button></th>
                        </tr>
                    </thead>
                </table>
            </form>
    );
}

function AddItem() {
    return (
    <div>
        <form>
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-300">
                        <th className="text-sm font-semibold border p-2">
                            <span for="name" className="flex justify-start font-bold">Name</span>
                            <input id="name" className="w-full  pl-1 rounded-md "></input></th>
                        <th className="text-sm font-semibold border p-2">
                            <span for="quan" className="flex justify-start font-bold">Quantity</span>
                            <input id="quan" className="w-full rounded-md "></input></th>
                        <th className="text-md font-semibold border p-2">
                            <button type="submit" className="w-full h-full bg-gray-100 px-2 py-1 font-bold rounded-md ">Submit</button></th>
                    </tr>
                </thead>
            </table>
        </form>
    </div>);}