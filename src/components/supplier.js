import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import Select from "react-select";
import { myContext } from "../context/adminContext";


export default function Shipping() {

    const { setPage } = useContext(myContext);
    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    const options = [
    { value: 'All', label: 'All' },
    // sets the options to the suppliers
    ...suppliers.map((supplier) => ({
    value: supplier.supplier_id,
    label: supplier.name,
    })),
    ];  

    const filteredSuppliers = selectedSupplier
    ? selectedSupplier.value === 'All'
      ? suppliers
      : suppliers.filter((sup) => sup.supplier_id === selectedSupplier.value)
    : suppliers;

    useEffect(() => {
        fetch('/api/suppliers/all')
            .then((res) => res.json())
            .then((data) => {
                setSuppliers(data);
            });
    }, []);

    return(
        <div className="h-screen px-8 pt-8">
            <div className="flex flex-col gap-5 ">
                <div id="header" className="flex flex-row justify-between">
                    <span className="text-xl font-bold">Suppliers</span>
                    <Select options={options} onChange={(selectedOption) => setSelectedSupplier(selectedOption)} className="w-96" />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row justify-between bg-gray-200 w-full p-5">
                        <div className="flex flex-row justify-between w-full">
                            <div className="text-md font-bold">Supplier List</div>
                            <button onClick={() => setPage("addSupplier")}><span className=" text-md bg-gray-100 px-2 py-1 rounded-md font-bold">Add Supplier</span></button>
                        </div>
                        <div className="flex flex-row gap-2">
                            {/* <button><span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">View All</span></button> */}
                        </div>
                    </div>
                    <div className="max-h-[560px] overflow-auto">
                        <table className="w-full border-collapse border">
                            <thead>
                                <tr className="bg-gray-400">
                                    <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white w-1/6 ">Supplier ID</th>
                                    <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white w-1/6 ">Address ID</th>
                                    <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white ">Name</th>
                                    <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white w-1/5">contact_info</th>
                                    <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white w-32">Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {filteredSuppliers.map((supplier) => (
                                <SupplierRow key={supplier.supplier_id} {...supplier} />
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>   
        </div>
    );
};

function SupplierRow(supplier) {

    const [edit, setEdit]= useState(false);   

    return (
        <tr className="bg-gray-300">
            
            {edit ? (<>
                <td className="text-sm font-semibold border h-12"><input placeholder={supplier.supplier_id} className="h-full w-full pl-2 bg-gray-300"/></td>
                <td className="text-sm font-semibold border h-12"><input placeholder={supplier.address_id} className="h-full w-full pl-2 bg-gray-300"/></td>
                <td className="text-sm font-semibold border h-12"><input placeholder={supplier.name} className="h-full w-full pl-2 bg-gray-300"/></td>
                <td className="text-sm font-semibold border h-12"><input placeholder={supplier.contact_info} className="h-full w-full pl-2 bg-gray-300"/></td>
            </>) : (<>
                <td className="text-sm font-semibold border p-2">{supplier.supplier_id}</td>
                <td className="text-sm font-semibold border p-2">{supplier.address_id}</td>
                <td className="text-sm font-semibold border p-2">{supplier.name}</td>
                <td className="text-sm font-semibold border p-2">{supplier.contact_info}</td>
            </>)}

            <td className="flex flex-row gap-2 text-sm font-semibold border p-2">
            {edit ?
            (<button onClick={() => setEdit(false)} className="bg-green-500 text-white px-4 py-2 w-full rounded">Cancel</button>)
            :
            (<button onClick={() => setEdit(true)} className="bg-green-500 text-white px-4 py-2 w-full rounded">EDIT</button>)
            }
            </td>
        </tr>
    )
}