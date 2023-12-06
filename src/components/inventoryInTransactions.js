import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { myContext } from "../context/adminContext";

export default function InventoryTransactions() {
  
  const { setPage } = useContext(myContext);
  const [transactions, setTransactions] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    fetch('/api/inventory_in/in')  // Ensure the leading slash for an absolute path
        .then(res => res.json())
        .then(transactions => {
            setTransactions(transactions);
        })
        .catch(error => console.error('Error fetching inventory transactions data:', error));
  }, []);

  useEffect(() => {
    // Assuming transactions is a state variable or a prop
    const newOptions = [
      { value: 'All', label: 'All' },
      ...transactions.map((transactions) => ({
        value: transactions.inventory_in_id,
        label: `${transactions.inventory_in_id} - ${transactions.date_ordered} - ${transactions.date_delivered}`,
      })),
    ];

    // Set the options in the component state
    setOptions(newOptions);
  }, [transactions]);

  // Filter products based on the selected value
  // Filter users based on the selected value
  const filteredtransactions = selectedTransaction
  ? selectedTransaction.value === 'All'
      ? transactions
      : transactions.filter((transaction) => transaction.inventory_in_id === selectedTransaction.value)
  : transactions;



  return (
    <div className="px-8 py-8">
      <div className="flex flex-col gap-5">
        <div id="header" className="flex flex-row justify-between">
          <span className="text-xl font-bold">Inventory In Transactions</span>
          <div className="flex flex-row gap-2">
          <Select options={options} className="w-96" onChange={(selectedOption) => setSelectedTransaction(selectedOption)} />
          <button
            onClick={() => setPage("inventory")}
            className="bg-gray-200 px-2 py-1 rounded-md font-medium"
          >
            Back
          </button>
          </div>
        </div>
        <table className="w-full border-collapse border">
            <thead>
                <tr className="bg-gray-400">
                    <th className="text-sm font-semibold border p-2 text-white">Inventory in ID</th>
                    <th className="text-sm font-semibold border p-2 text-white">Supplier ID</th>
                    <th className="text-sm font-semibold border p-2 text-white">Description</th>
                    <th className="text-sm font-semibold border p-2 text-white">Payment Amount</th>
                    <th className="text-sm font-semibold border p-2 text-white">Date Ordered</th>
                    <th className="text-sm font-semibold border p-2 text-white">Date Delivered</th>
                    <th className="text-sm font-semibold border p-2 text-white">Actions</th>
                </tr>
            </thead>
            <tbody>
              {filteredtransactions.map((transaction) => (
                <TransactionsList key={transaction.inventory_in_id} transactions={transaction} />
              ))}
            </tbody>
            </table>
        </div>
    </div>
  );
}

function TransactionsList({transactions: k}) {

  const [isExpanded, setIsExpanded] = useState(false)
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`/api/inventory_in/in/${k.inventory_in_id}`)
        .then(res => res.json())
        .then(data => {
            setItems(data);
        })
        .catch(error => console.error('Error fetching inventory transactions data:', error));
  }, [k.inventory_in_id]);

  return(
    <>
        {/* {products.map((product) => ( */}
        <tr className="bg-gray-300">
        <td className="text-sm font-semibold border p-2">{k.inventory_in_id}</td>
        <td className="text-sm font-semibold border p-2">{k.supplier_id}</td>
        <td className="text-sm font-semibold border p-2">{k.comment}</td>
        <td className="text-sm font-semibold border p-2">&#x20B1;{k.payment_amount}</td>
        <td className="text-sm font-semibold border p-2">{k.date_ordered}</td>
        <td className="text-sm font-semibold border p-2">{k.date_delivered}</td>
        <td className="text-sm font-semibold border p-2 w-1/6"><button onClick={toggleExpand} className="w-full bg-blue-400 h-10 rounded-md">{isExpanded ? 'COLLAPSE' : 'EXPAND'}</button></td>
    </tr>
    {isExpanded && (
    <tr className="bg-slate-100 border-collapse border">
        <td colSpan={8}>
          <table className="w-full ">
            {/* ito yung mag ulit */}
            <thead className="border border-white">
              <tr>
                <th className="text-sm font-semibold p-2 text-black">Item Id</th>
                <th className="text-sm font-semibold p-2 text-black">Quantity</th>
                <th className="text-sm font-semibold p-2 text-black">Price</th>
              </tr>
            </thead>
            {/* dito mag end */}
            <tbody>
            {items.map((item) => (
              <tr className="border border-white">
                <th className="text-sm font-semibold p-2 text-black">{item.product_id}d</th>
                <th className="text-sm font-semibold p-2 text-black">{item.quantity}</th>
                <th className="text-sm font-semibold p-2 text-black">{item.price}</th>
              </tr>
            ))}
            </tbody>
          </table>
        </td>
    </tr>
    )}
    </>
  )
}