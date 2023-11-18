import React, { useState, useEffect, useContext } from "react";
import { myContext } from "../context/adminContext";
import "../App.css";
import Select from "react-select";

export default function Inventory() {
  const [addItem, showAddItem] = useState(false);
  const [editItem, showEditItem] = useState(false);

  const { setPage } = useContext(myContext);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch('/api/product')
      .then((res) => res.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);

  // Generate options based on products
  const options = [
    { value: 'All', label: 'All' },
    ...products.map((product) => ({
      value: product.product_id,
      label: product.name,
    })),
  ];

  // Filter products based on the selected value
  const filteredProducts = selectedProduct
    ? selectedProduct.value === 'All'
      ? products
      : products.filter((product) => product.product_id === selectedProduct.value)
    : products;

  return (
    <div className="h-screen px-8 pt-8">
      <div className="flex flex-col gap-5 ">
        <div id="header" className="flex flex-row justify-between">
          <span className="text-xl font-bold">Inventory</span>
          <Select
            options={options}
            className="w-96"
            onChange={(selectedOption) => setSelectedProduct(selectedOption)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row justify-between bg-gray-200 w-full p-5">
            <div>
              <span className="text-md font-bold">Product List</span>
            </div>
            <div className="flex flex-row gap-2">
              <button onClick={() => setPage("inventoryTransactions")}>
                <span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">View Stock Transactions</span>
              </button>
              <button onClick={() => setPage("inventoryIn")}>
                <span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">Stock-in</span>
              </button>
              <button onClick={() => setPage("inventoryOut")}>
                <span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">Stock-out</span>
              </button>
              <button onClick={() => setPage("addItem")}>
                <span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">Add Item</span>
              </button>
              {/* <button>
                <span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">View All</span>
              </button> */}
            </div>
          </div>
          <div className="max-h-[560px] overflow-auto">
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-400">
                  <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Product ID</th>
                  <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Name</th>
                  <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Description</th>
                  <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Category</th>
                  <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Price</th>
                  <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Threshold</th>
                  <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr className="bg-gray-300" key={product.product_id}>
                    <td className="text-sm font-semibold border p-2">{product.product_id}</td>
                    <td className="text-sm font-semibold border p-2">{product.name}</td>
                    <td className="text-sm font-semibold border p-2">{product.description}</td>
                    <td className="text-sm font-semibold border p-2">{product.category}</td>
                    <td className="text-sm font-semibold border p-2">&#x20B1;{product.price}</td>
                    <td className="text-sm font-semibold border p-2">{product.threshold}</td>
                    <td className="text-sm font-semibold border p-2">{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
