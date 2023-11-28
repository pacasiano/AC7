import React, {useContext, useState} from "react";
import "../App.css";
import { myContext } from "../context/adminContext";


export default function SupplierAdd() {

    const { setPage } = useContext(myContext);
    const [invalidInput, setInvalidInput] = useState(false);

    return(
        <div className="px-8 py-8">
        <div className="flex flex-col gap-5">
            <div id="header" className="flex flex-row justify-between">
            <span className="text-xl font-bold">Add Supplier</span>
            <button onClick={() => setPage("viewSuppliers")}className="bg-gray-200 px-2 py-1 rounded-md font-medium">Back</button>
            </div>
            <form className="flex flex-col gap-3">
                {/* SUPPLIER INFO */}
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-400">
                        <th className="text-md font-bold border p-2 text-white w-1/5" >
                            Supplier Name
                        </th>
                        <th className="text-md font-bold border p-2 text-white w-1/5" >
                            Contact Info
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-300">
                        <td className="text-sm font-semibold border p-2">
                            <input name="supplier_name" type="text" className="w-full h-10 text-center" required />
                        </td>
                        <td className="text-sm font-semibold border p-2">
                            <input name="cont   act_info" type="text" className="w-full h-10 text-center" />
                        </td>
                        </tr>
                    </tbody>
                </table>

                <div className={`${invalidInput === true ? "animate-wiggle" : ""} text-sm w-full flex justify-end font-semibold p-2`}>
                    <button className={` bg-green-600 p-3 w-44 rounded-xl text-white`}>SUBMIT</button>
                </div>
            </form>
            </div>
        </div>
    );
}