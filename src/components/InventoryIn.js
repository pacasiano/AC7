import React, { useState, useEffect } from "react"
import Select from "react-select"
import { Link } from "react-router-dom";
import "../App.css"
import { uniq } from 'lodash'; // import lodash uniq function

export default function InventoryIn() {

    const [numbersToBeDelivered, setNumbersToBeDelivered] = useState(1);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        fetch('/api/suppliers') //fetch data 
            .then((res) => res.json()) //convert json into js object
            .then((suppliers) => { //store the data in 'products' state variable
                setSuppliers(suppliers);
            });
    }, []);

    const options = suppliers.map((supplier) => (
        {value: `${supplier.name}`, label: `${supplier.name}`}
    ))

    const options2 = [
        {value: "1", label: "1 Item"},
        {value: "2", label: "2 Items"},
        {value: "3", label: "3 Items"},
        {value: "4", label: "4 Items"},
        {value: "5", label: "5 Items"},
        {value: "6", label: "6 Items"},
        {value: "7", label: "7 Items"},
        {value: "8", label: "8 Items"},
        {value: "9", label: "9 Items"},
        {value: "10", label: "10 Items"},
    ];

    return(
        <div className=" px-8 py-8 ">
            <div className="flex flex-col gap-5 ">
                <div id="header" className="flex flex-row justify-start">
                    <span className="text-xl font-bold">Inventory In</span>
                </div>
                <form action="/api/inventory_in" method="POST" className="flex flex-col gap-3">
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-400">
                                <th className="text-md font-bold border p-2 text-white" required>Supplier Name</th>
                                <th className="text-md font-bold border w-60 p-2 text-white" required>Payment</th>
                                <th className="text-md font-bold border p-2 text-white w-44" required>Number of Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-300">
                                <td className="text-sm font-semibold border p-2">
                                    <Select options={options} name="supplier_name" className="w-full text-center" required/></td>
                                <td className="text-sm font-semibold border p-2">
                                    <input name="payment_amount" type="number" className="w-full h-10 text-center" required></input></td>
                                <td className="text-sm font-semibold border p-2">
                                    <Select options={options2} onChange={(opt) => setNumbersToBeDelivered(opt.value)} className=" w-full text-center" required />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex flex-col gap-3">
                        <span className="text-xl font-bold ">Items</span>
                        <table className="w-full">
                            <thead className="bg-gray-400">
                                <tr>
                                    <th className="text-sm font-semibold border p-2 text-white">Item Name</th>
                                    <th className="text-sm w-44 font-semibold border p-2 text-white">Price per Item</th>
                                    <th className="text-sm w-44 font-semibold border p-2 text-white">Quantity</th>
                                </tr>
                            </thead>
                            {Array.from({ length: numbersToBeDelivered }, (_, index) => (
                                <Items key={index} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
                            ))}
                        </table>
                        <table className="w-full border-0 border-collapse">
                            <thead>
                                <tr>
                                    <th className="text-sm font-semibold p-2"></th>
                                    <th className="text-sm w-44 font-semibold p-2">
                                        <button className="bg-green-600 p-3 w-full rounded-xl text-white">SUBMIT</button>
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>        
                </form>
            </div>   
        </div>
    );
}

function Items({ selectedProducts, setSelectedProducts }) {
    const [products, setProducts] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        fetch('/api/products') //fetch data 
            .then((res) => res.json()) //convert json into js object
            .then((products) => { //store the data in 'products' state variable
                setProducts(products);
            });
    }, []);

    const options = products.map((product) => (
        {
            value: `${product.name}`, 
            label: `${product.name}`,
            isDisabled: selectedProducts.includes(product.name)
        }
    ))

    const handleProductChange = (option) => {
        let updatedProducts = [...selectedProducts];
        if (selectedOption) {
            updatedProducts = updatedProducts.filter(product => product !== selectedOption.value);
        }
        if (option) {
            updatedProducts = [...updatedProducts, option.value];
        }
        setSelectedProducts(updatedProducts);
        setSelectedOption(option);
    }

    return(

        <tbody className="bg-gray-300">
            <tr>
                <td className="text-sm font-semibold border p-2 text-black">
                <Select 
                    options={options} 
                    name="product_name" 
                    className="h-10 w-full text-center" 
                    onChange={handleProductChange}
                    required
                />
                </td>
                <td className="text-sm font-semibold border p-2 text-black">
                    <input name="price" type="number" className="h-10 w-full text-center pl-1" required></input></td>
                <td className="text-sm font-semibold border p-2 text-black">
                    <input name="quantity" type="number" className="h-10 w-full text-center pl-1" required></input></td>
            </tr>
        </tbody>

    )
}