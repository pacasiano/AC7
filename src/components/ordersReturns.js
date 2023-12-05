import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import Select from "react-select";
import { myContext } from "../context/adminContext";


export default function Returns() {

    const { setPage } = useContext(myContext);
    const [orders, setOrders] = useState([]);
    const [selectedReturn, setSelectedReturn] = useState(null);
    const [reloadData, setReloadData] = useState(false);
    const [options, setOptions] = useState([])
    const [refundSucces, setRefundSucces] = useState(false);
    const [returnRefundSucces, setReturnRefundSucces] = useState(false);
    const [rejectSucces, setRejectSucces] = useState(false);

    useEffect(() => {
        fetch('/api/orders/return_request')
            .then((res) => res.json())
            .then((orders) => {
                // select only orders with status processing return
                // const returnedOrders = orders.filter((order) => order.sale_status === "processing return")
                setOrders(orders);
            });
    }, [reloadData]);

    useEffect(() => {
        // Assuming orders is a state variable or a prop
        const newOptions = [
          { value: 'All', label: 'All' },
          ...orders.map((order) => ({
            value: order.sale_id,
            label: `${order.sale_id} - ${order.full_name} - ${order.sale_date}`,
          })),
        ];
    
        // Set the options in the component state
        setOptions(newOptions);
      }, [orders]);

    // Filter products based on the selected value
    // Filter users based on the selected value
    const filteredOrders = selectedReturn
    ? selectedReturn.value === 'All'
        ? orders
        : orders.filter((order) => order.sale_id === selectedReturn.value)
    : orders;

    console.log(orders)

    return(<>
        <Refund isModalOpen={refundSucces} setIsModalOpen={setRefundSucces} />
        <ReturnRefund isModalOpen={returnRefundSucces} setIsModalOpen={setReturnRefundSucces} />
        <Reject isModalOpen={rejectSucces} setIsModalOpen={setRejectSucces} />
        <div className="h-screen px-8 pt-8">
            <div className="flex flex-col gap-5 ">
                <div id="header" className="flex flex-row justify-between">
                    <span className="text-xl font-bold">Orders</span>
                    <Select options={options} onChange={(selectedOption) => setSelectedReturn(selectedOption)} className="w-96 z-0" />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row justify-between bg-gray-200 w-full p-5">
                        <div className="flex flex-row justify-between w-full">
                            <div className="text-md font-bold">Requested Returns</div>
                            <button onClick={() => setPage("orders")}><span className=" text-md bg-gray-100 px-2 py-1 rounded-md font-bold">View All Orders</span></button>
                        </div>
                        <div className="flex flex-row gap-2">
                            {/* <button><span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">View All</span></button> */}
                        </div>
                    </div>
                    <div className=" overflow-auto">
                        <table className="w-full border-collapse border">
                            <thead>
                                <tr className="bg-gray-400 border">
                                    <th className="sticky bg-gray-400 text-sm font-semibold border p-2 text-white">Order ID</th>
                                    <th className="sticky bg-gray-400 text-sm font-semibold border p-2 text-white">User ID</th>
                                    {/* <th className="text-sm font-semibold border p-2 text-white">Product ID</th> */}
                                    <th className="sticky bg-gray-400 text-sm font-semibold border p-2 text-white">Full Name</th>
                                    <th className="sticky bg-gray-400 text-sm font-semibold border p-2 text-white">Order Date</th>
                                    <th className="sticky bg-gray-400 text-sm font-semibold border p-2 text-white">Proof</th>
                                    <th className="sticky bg-gray-400 text-sm font-semibold border p-2 text-white">Reason for Return</th>
                                    {/* <th className="text-sm font-semibold border p-2 text-white">Quantity</th> */}
                                    <th className="sticky bg-gray-400 text-sm font-semibold border p-2 text-white">Total</th>
                                    <th className="sticky bg-gray-400 text-sm font-semibold border p-2 text-white">Actions</th>
                                </tr>
                            </thead>
                                {filteredOrders.map((returns) => (
                                <ReturnedRow key={returns.sale_id} returns={returns} setReloadData={setReloadData} reloadData={reloadData} setRefundSucces={setRefundSucces} setReturnRefundSucces={setReturnRefundSucces} setRejectSucces={setRejectSucces} />
                                ))}
                        </table>
                    </div>
                </div>
            </div>   
        </div>
        </>
    );
};

function ReturnedRow({returns, setReloadData, reloadData, setRefundSucces, setReturnRefundSucces, setRejectSucces}) {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const [order_items, setOrder_item] = useState([]);

    useEffect(() => {
        fetch(`/api/order_item/${returns.sale_id}`) //fetch data 
            .then((res) => res.json()) //convert json into js object
            .then((data) => { //store the data in 'products' state variable
            setOrder_item(data);
            });
    }, [returns.sale_id]);

    //Get cookie
    const accountId = document.cookie
    .split("; ")
    .find((row) => row.startsWith("account_id="))
    ?.split("=")[1];

    function refund() {
      setRefundSucces(true);
      setReloadData(!reloadData);
    }

    function returnrefund() {
      setReturnRefundSucces(true);
      setReloadData(!reloadData);
    }

    function reject() {

      fetch(`/api/return/${returns.return_request_id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          action: 'reject',
          account_id: accountId
        })
      })
      setRejectSucces(true);
      setReloadData(!reloadData);
    }

    const imgPath = require(`../imgs/${returns.img}`)

    return (

        <tbody>
          <tr className="bg-gray-300">
            <td className="text-sm font-semibold border p-2">{returns.sale_id}</td>
            <td className="text-sm font-semibold border p-2">{returns.account_id}</td>
            <td className="text-sm font-semibold border p-2">{returns.full_name}</td>
            <td className="text-sm font-semibold border p-2">{returns.sale_date}</td>
            <td className="text-sm font-semibold border p-2">
              <img src={imgPath} style={{ maxWidth: '200px' }}></img>  
            </td>
            <td className="text-sm font-semibold border p-2">{returns.comment}</td>
            <td className="text-sm font-semibold border p-2">&#x20B1;{returns.price}</td>
            <td className="w-36 text-sm font-semibold border p-2">
              <div className="flex flex-col gap-1">
                <button onClick={refund} className={` bg-green-500/90 hover:bg-green-600 text-white py-2 w-full rounded`}>Refund</button>
                <button onClick={returnrefund} className={` bg-green-500/90 hover:bg-green-600 text-white py-2 w-full rounded`}>Return & Refund</button>
                <button onClick={reject} className={` bg-red-500/90 hover:bg-red-600 text-white py-2 w-full rounded`}>Reject</button>
                <button onClick={toggleExpand} className="bg-blue-500/90 hover:bg-blue-600 text-white py-2 w-full rounded">{isExpanded ? 'Collapse' : 'Expand'}</button>
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
    )
}

const Modal = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        </div>
      </div>
  );
};

function Refund({isModalOpen, setIsModalOpen}) {

  useEffect(() => {
    setTimeout(() => {
      setIsModalOpen(false)
    }, 2000)
  }, [isModalOpen, setIsModalOpen])

  return (
    <div className="fixed pt-5 z-50">
      <Modal isOpen={isModalOpen}>
        <div className="w-screen flex justify-center items-center -translate-x-52">
            <div className="bg-gray-50 p-3 rounded-xl w-1/3 shadow-md border">
              <div className="text-green-500 text-md font-semibold text-center">Refund accepted!</div>
            </div>
        </div>
      </Modal>
    </div>
  );
};

function ReturnRefund({isModalOpen, setIsModalOpen}) {

  useEffect(() => {
    setTimeout(() => {
      setIsModalOpen(false)
    }, 2000)
  }, [isModalOpen, setIsModalOpen])

  return (
    <div className="fixed pt-5 z-50">
      <Modal isOpen={isModalOpen}>
        <div className="w-screen flex justify-center items-center -translate-x-52">
            <div className="bg-gray-50 p-3 rounded-xl w-1/3 shadow-md border">
              <div className="text-green-500 text-md font-semibold text-center">Refund and Return Accepted!</div>
            </div>
        </div>
      </Modal>
    </div>
  );
};


function Reject({isModalOpen, setIsModalOpen}) {

  useEffect(() => {
    setTimeout(() => {
      setIsModalOpen(false)
    }, 2000)
  }, [isModalOpen, setIsModalOpen])

  return (
    <div className="fixed pt-5 z-50">
      <Modal isOpen={isModalOpen}>
        <div className="w-screen flex justify-center items-center -translate-x-52">
            <div className="bg-gray-50 p-3 rounded-xl w-1/3 shadow-md border">
              <div className="text-green-500 text-md font-semibold text-center">Order Rejected!</div>
            </div>
        </div>
      </Modal>
    </div>
  );
};
