import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import "../App.css";
import { myContext } from "../context/inventoryContext";

export default function InventoryOut() {
  const [numbersToBeDelivered, setNumbersToBeDelivered] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const { setPage } = useContext(myContext);

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((employees) => {
        setEmployees(employees);
      });
  }, []);

  const options = employees.map((employee) => ({
    value: `${employee.name}`,
    label: `${employee.name}`,
  }));

  const options2 = [
   
  ];

  return (
    <div className=" px-8 py-8 ">
      <div className="flex flex-col gap-5 ">
        <div id="header" className="flex flex-row justify-between">
          <span className="text-xl font-bold">Inventory Out</span>
          <button
            onClick={() => setPage("inventory")}
            className="bg-gray-200 px-2 py-1 rounded-md font-medium"
          >
            Back
          </button>
        </div>
        <form action="/api/inventory_out" method="POST" className="flex flex-col gap-3">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-400">
                <th className="text-md font-bold border p-2 text-white" required>
                  Employee Name
                </th>
                <th className="text-md font-bold border p-2 text-white w-1/2" required>
                  Comments
                </th>
                <th className="text-md font-bold border p-2 text-white w-44" required>
                  Number of Items
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-300">
                <td className="text-sm font-semibold border p-2">
                  <Select options={options} name="employee_name" className="w-full text-center" required />
                </td>
                <td className="text-sm font-semibold border p-2">
                  <input name="comments" type="text" className="w-full h-10 text-center" />
                </td>
                <td className="text-sm font-semibold border p-2">
                  <Select
                    options={options2}
                    onChange={(opt) => setNumbersToBeDelivered(opt.value)}
                    className=" w-full text-center"
                    required
                  />
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
    fetch("/api/products")
      .then((res) => res.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);

  const options = products.map((product) => ({
    value: `${product.name}`,
    label: `${product.name}`,
    isDisabled: selectedProducts.includes(product.name),
  }));

  const handleProductChange = (option) => {
    let updatedProducts = [...selectedProducts];
    if (selectedOption) {
      updatedProducts = updatedProducts.filter((product) => product !== selectedOption.value);
    }
    if (option) {
      updatedProducts = [...updatedProducts, option.value];
    }
    setSelectedProducts(updatedProducts);
    setSelectedOption(option);
  };

  return (
    <tbody className="bg-gray-300">
      <tr>
        <td className="text-sm font-semibold border p-2">
          <Select
            options={options}
            name="product_name"
            className="h-10 w-full text-center"
            onChange={handleProductChange}
            required
          />
        </td>
        <td className="text-sm font-semibold border p-2">
          <input name="quantity" type="number" className="h-10 w-full text-center pl-1" required></input>
        </td>
      </tr>
    </tbody>
  );
}
