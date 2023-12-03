import React, { useState, useEffect } from 'react';

function Order({ order, setReloadData, setShipped, setReturned, setPacked, reloadData }) {
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
}, [order.sale_id]);

  function sent(e) {
    e.preventDefault();

    fetch(`/api/orders/${order.sale_id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        new_sale_status: 'shipped'
      })
    })
    .then(res => res.json())
    .then((data) =>{
      console.log(data);
      setShipped(true);
      setReloadData(!reloadData);
    })

    
  }

  function returned(e) {
    e.preventDefault();

    fetch(`/api/orders/${order.sale_id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        new_sale_status: 'returned'
      })
    })
    .then(res => res.json())
    .then((data) =>{
      console.log(data);
      setReturned(true);
      setReloadData(!reloadData);
    })
  }

  function packed(e) {
    e.preventDefault();

    fetch(`/api/orders/${order.sale_id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        new_sale_status: 'packed'
      })
    })
    .then(res => res.json())
    .then((data) =>{
      console.log(data);
      setPacked(true);
      setReloadData(!reloadData);
    })
  }


  return (

    <tbody>
      <tr className="bg-gray-300">
        <td className="text-sm font-semibold border p-2">{order.sale_id}</td>
        <td className="text-sm font-semibold border p-2">{order.account_id}</td>
        <td className="text-sm font-semibold border p-2">{order.full_name}</td>
        <td className="text-sm font-semibold border p-2">{order.sale_date}</td>
        <td className="text-sm font-semibold border p-2">{order.sale_status}</td>
        <td className="text-sm font-semibold border p-2">&#x20B1;{order.price}</td>
        <td className="w-36 text-sm font-semibold border p-2">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-1">
              <button onClick={packed} disabled={!(order.sale_status === "cart")} className={`${!(order.sale_status === "cart") ? "bg-gray-200 text-gray-400" : "bg-green-500 text-white" } py-2 w-full rounded`}>Packed</button>
              <button onClick={sent} disabled={order.sale_status !== "packaging"} className={`${order.sale_status !== "packaging" ? "bg-gray-200 text-gray-400" : "bg-green-500 text-white" } py-2 w-full rounded`}>Shipped</button>
            </div>
            <div className="flex flex-row gap-1">
              <button onClick={returned} disabled={!(order.sale_status === "shipped")} className={`${!(order.sale_status === "shipped") ? "bg-gray-200 text-gray-400" : "bg-green-500 text-white" } py-2 w-full rounded`}>Returned</button>
              <button onClick={toggleExpand} className="bg-blue-500 text-white py-2 w-full rounded">{isExpanded ? 'Collapse' : 'Expand'}</button>
            </div>
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-slate-100">
          <td colSpan={7}>

            {/* ito yung mag ulit */}
            <table className="w-full">
              <thead>
                <tr className="bg-slate-200">
                  <th className="text-sm font-semibold p-2 text-black w-1/3">Product Id</th>
                  <th className="text-sm font-semibold p-2 text-black w-1/3">Quantity</th>
                  <th className="text-sm font-semibold p-2 text-black w-1/3">Price</th>
                </tr>
              </thead>
              <tbody>
              {order_items.map((order_item) => (
                <tr className="text-middle border-t border-white">
                  <th className="text-sm font-normal p-2 text-black">{order_item.product_id}</th>
                  <th className="text-sm font-normal p-2 text-black">{order_item.quantity}</th>
                  <th className="text-sm font-normal p-2 text-black">{order_item.price}</th>
                </tr>
              ))}
              </tbody>
            </table>
            {/* dito mag end */}
            
          </td>
        </tr>
      )}
    </tbody>

  );
}


export default Order;
