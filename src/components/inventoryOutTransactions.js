import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { myContext } from "../context/adminContext";

export default function InventoryTransactions() {
  
  const { setPage } = useContext(myContext);
  const [transactions, setTransactions] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    fetch('/api/inventory_out/out')  // Ensure the leading slash for an absolute path
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
        label: `${transactions.inventory_out_ref_num} - ${transactions.date}}`,
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
          <span className="text-xl font-bold">Inventory Out Transactions</span>
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
                    <th className="text-sm font-semibold border p-2 text-white">Inventory out ID</th>
                    <th className="text-sm font-semibold border p-2 text-white">Employee ID</th>
                    <th className="text-sm font-semibold border p-2 text-white">Date</th>
                    <th className="text-sm font-semibold border p-2 text-white">Comment</th>
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
    fetch(`/api/inventory_out/out/${k.inventory_out_ref_num}`)
        .then(res => res.json())
        .then(data => {
            setItems(data);
            console.log(data);
        })
        .catch(error => console.error('Error fetching inventory transactions data:', error));
  }, [k.inventory_out_ref_num]);

  return(
    <>
        {/* {products.map((product) => ( */}
        <tr className="bg-gray-300">
        <td className="text-sm font-semibold border p-2">{k.inventory_out_ref_num}</td>
        <td className="text-sm font-semibold border p-2">{k.employee_id}</td>
        <td className="text-sm font-semibold border p-2">{k.date}</td>
        <td className="text-sm font-semibold border p-2">{k.comment}</td>
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
                <th className="text-sm font-semibold p-2 text-black">Coment</th>
              </tr>
            </thead>
            {/* dito mag end */}
            <tbody>
            {items.map((item) => (
              <tr className="border border-white">
                <th className="text-sm font-semibold p-2 text-black">{item.product_id}d</th>
                <th className="text-sm font-semibold p-2 text-black">{item.quantity}</th>
                <th className="text-sm font-semibold p-2 text-black">{item.comment}</th>
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