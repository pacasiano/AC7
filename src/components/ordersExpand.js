import React, { useState } from 'react';

function Order({ order }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (

    <div className="h-scren w-full px-8 pt-8">
    <tbody>
      <tr className="bg-gray-300">
        <td className="text-sm font-semibold border p-2">{order.sale_id}</td>
        <td className="text-sm font-semibold border p-2">{order.account_id}</td>
        <td className="text-sm font-semibold border p-2">{order.address_id}</td>
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
              <div className="text-sm font-semibold p-2 text-black">Item Id</div>
              <div className="text-sm font-semibold p-2 text-black">Quantity</div>
              <div className="text-sm font-semibold p-2 text-black">Price</div>
            </div>
            {/* dito mag end */}

          </td>
        </tr>
      )}
    </tbody>
    </div>
  );
}

export default Order;
