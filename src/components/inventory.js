import React, { useState, useEffect, useContext } from "react";
import { myContext } from "../context/adminContext";
import "../App.css";
import Select from "react-select";
import { IoWarning } from "react-icons/io5";

export default function Inventory() {

  

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
                  {/* <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Price</th> */}
                  <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Threshold</th>
                  <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Quantity</th>
                  <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                <InventoryCard key={product.product_id} product={product} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function InventoryCard({ product }) {

  const [extend, setExtend] = useState(false);

  const [batches, setBatches] = useState([]);

  useEffect(() => {
    fetch(`/api/stock/${product.product_id}/all`)
      .then((res) => res.json())
      .then((data) => {
        setBatches(data);
      });
  }, []);

  function extendHandler() {
    setExtend(!extend);
  }

  return (
    <>
    <tr className={`bg-gray-300 h-12`} key={product.product_id}>
      <td className="text-sm font-semibold border p-2">{product.product_id}</td>
      <td className="text-sm font-semibold border p-2">{product.name}</td>
      <td className="text-sm font-semibold border p-2">{product.description}</td>
      <td className="text-sm font-semibold border p-2">{product.category}</td>
      {/* <td className="text-sm font-semibold border p-2">&#x20B1;{product.price}</td> */}
      <td className="text-sm font-semibold border p-2">{product.threshold}</td>
      <td className={`${product.quantity <= product.threshold && "text-orange-500"} font-semibold text-sm  border p-2`}><div className="flex flex-row items-center gap-1">{product.quantity} {product.quantity <= product.threshold ? <IoWarning className="text-2xl font-bold" /> : ""}</div></td>
      {extend ? (
        <td className="text-sm font-semibold border px-2 w-20 text-white"><button onClick={extendHandler} className="bg-blue-500 p-2 w-full rounded-md">Close</button></td>  
      ) : (
        <td className="text-sm font-semibold border px-2 w-20 text-white"><button onClick={extendHandler} className="bg-blue-500 p-2 w-full rounded-md">Extend</button></td>
      )}
    </tr>
    {extend && (
    <tr>
      <td className="text-sm text-center bg-slate-100" colSpan={7}>
      
      <table className="w-full">
        <thead>
          <tr className="bg-slate-200">
            <th className="text-sm font-semibold p-2 text-neutral-800">Batch no.</th>
            <th className="text-sm font-semibold p-2 text-neutral-800">Price</th>
            <th className="text-sm font-semibold p-2 text-neutral-800">Quantity</th>
            <th className="text-sm font-semibold p-2 text-neutral-800">Date</th>
          </tr>
        </thead>
        <tbody>
          {/* repeat this shi */}
          {batches.map((batch) => (
            <tr className="h-8 border-t border-white">
              <td className="text-sm font-normal">{batch.batch_no}</td>
              <td className="text-sm font-normal">&#x20B1;{batch.price}</td>
              <td className="text-sm font-normal">{batch.quantity}</td>
              <td className="text-sm font-normal">{batch.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      </td>
    </tr>
    )}
    </>
  );
}