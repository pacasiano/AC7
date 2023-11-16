import React, { useState, useEffect } from 'react';

function Order({ order }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const [order_items, setOrder_item] = useState([]);

  useEffect(() => {
    fetch(`/api/order_item/${order.sale_id}`) //fetch data 
        .then((res) => res.json()) //convert json into js object
        .then((data) => { //store the data in 'products' state variable
          setOrder_item(data);
        });
}, []);

  return (

    <tbody>
      <tr className="bg-gray-300">
        <td className="text-sm font-semibold border p-2">{order.sale_id}</td>
        <td className="text-sm font-semibold border p-2">{order.account_id}</td>
        <td className="text-sm font-semibold border p-2">{order.full_name}</td>
        <td className="text-sm font-semibold border p-2">{order.sale_date}</td>
        <td className="text-sm font-semibold border p-2">{order.sale_status}</td>
        <td className="text-sm font-semibold border p-2">&#x20B1;{order.price}</td>
        <td className="w-32 text-sm font-semibold border p-2">
        <button onClick={toggleExpand} className="bg-blue-500 text-white py-2 w-full rounded">{isExpanded ? 'COLLAPSE' : 'EXPAND'}</button>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-slate-100 border-collapse border">
          <td colSpan={7}>

            {/* ito yung mag ulit */}
              <div className="flex flex-row justify-evenly">
                <div className="text-sm font-semibold p-2 text-black">Product Id</div>
                <div className="text-sm font-semibold p-2 text-black">Quantity</div>
                <div className="text-sm font-semibold p-2 text-black">Price</div>
              </div>
            {order_items.map((order_item) => (
              <div className="flex flex-row justify-evenly">
                <div className="text-sm font-semibold p-2 text-black">{order_item.product_id}</div>
                <div className="text-sm font-semibold p-2 text-black">{order_item.quantity}</div>
                <div className="text-sm font-semibold p-2 text-black">{order_item.price}</div>
              </div>
            ))}
            {/* dito mag end */}
            
          </td>
        </tr>
      )}
    </tbody>

  );
}

export default Order;
