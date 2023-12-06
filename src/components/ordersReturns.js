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
    const [selectedSale, setSelectedSale] = useState("");
    const [refund, setRefund] = useState(false)
    const [refturn, setRefturn] = useState(false)
    const [reject, setReject] = useState(false)

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
        <RefundInput isModalOpen={refund} sale_id={selectedSale} setIsModalOpen={setRefund} setRefundSucces={setRefundSucces}  setReloadData={setReloadData} reloadData={reloadData}/>
        <RefundReturn isModalOpen={refturn} selectedSale={selectedSale} setIsModalOpen={setRefturn} setReturnRefundSucces={setReturnRefundSucces} setReloadData={setReloadData} reloadData={reloadData} />
        <RejectRefund isModalOpen={reject} selectedSale={selectedSale} setIsModalOpen={setReject} setRejectSucces={setRefundSucces} setReloadData={setReloadData} reloadData={reloadData}/>
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
                                <ReturnedRow key={returns.sale_id} setRefturn={setRefturn} setRefund={setRefund} setReject={setReject} returns={returns} setSelectedSale={setSelectedSale} />
                                ))}
                        </table>
                    </div>
                </div>
            </div>   
        </div>
        </>
    );
};

function ReturnedRow({returns, setRefund, setRefturn, setReject, setSelectedSale}) {

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

    function refund() {
      setSelectedSale(returns.sale_id)
      setRefund(true)
      // setRefundSucces(true);
      // setReloadData(!reloadData);
    }

    function returnrefund() {
      setSelectedSale(returns.sale_id)
      setRefturn(true);
      // setReloadData(!reloadData);
    }

    function reject() {
      setSelectedSale(returns.sale_id)
      setReject(true);
      
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
              <img src={imgPath} alt="" style={{ maxWidth: '200px' }}></img>  
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
              <td colSpan={8}>

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
              <div className="text-green-500 text-md font-semibold text-center">Refund Completed!</div>
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

function RefundInput({sale_id, isModalOpen, setIsModalOpen, setRefundSucces, setReloadData, reloadData}) {

  
  console.log('INSIDE ZREFUND INPUT')
  console.log(sale_id)
  const [refundSet, setRefundSet] = useState({
    comment: '',
    amount: ''
  });

  const accountId = document.cookie
    .split("; ")
    .find((row) => row.startsWith("account_id="))
    ?.split("=")[1];

  function handleChange(event) {
    setRefundSet({...refundSet, [event.target.name]: event.target.value});  
  }
  
  // Dito yung return form submit function
  function handleSubmit(e) {
    e.preventDefault();


    const refundForm = document.getElementById('refundForm')
    const formData = new FormData(refundForm)

    let newFormData = {
      ...formData,
      action: 'refund',
      account_id: accountId
    }

    fetch(`/api/return/${sale_id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newFormData)
    })


    setRefundSucces(true)
    setIsModalOpen(false)
    setReloadData(!reloadData);

  }

  return (
    <div className="fixed backdrop-blur-sm -translate-x-56 bg-black/20 drop-shadow-xl  z-50">
        <Modal isOpen={isModalOpen}>
          <div className="h-screen w-screen  flex justify-center items-center backdrop-blur-sm bg-white/30 ">
            <form onSubmit={handleSubmit} id="refundForm" className="fixed bg-gray-100 -mt-20 rounded-xl w-[40rem]">
                <div className="flex flex-col gap-5 text-center py-5 px-10">
                  <div className="text-2xl font-bold">
                    Refund Form
                  </div>
                  <div className="flex flex-col gap-5">

                    <div className="flex flex-col gap-2">
                      <div className="text-md text-left font-bold">
                        Refund Amount
                      </div>
                      <div>
                        <input name="refundAmount" onChange={handleChange} type="number" className="w-full border-2 border-black/60 rounded-md p-2" required/>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="text-md text-left font-bold">
                        Comments
                      </div>
                      <div>
                        <textarea name="comment" type="text" onChange={handleChange} className="w-full h-44 border-2 border-black/60 rounded-md p-2 resize-none" required/>
                      </div>
                    </div>

                    <div className="flex flex-row gap-1">
                    <button type="button" onClick={() =>  setIsModalOpen(false)} className="bg-black/80 hover:bg-black text-gray-50 p-2 rounded-md w-1/2 font-medium">Cancel</button>
                    <button type="submit" className="bg-green-900/80 hover:bg-green-900 text-gray-50 p-2 rounded-md w-full font-medium">Submit</button>
                    </div>
                  </div>
                </div>
            </form>
          </div>
        </Modal>
      </div>
  );
};


function RefundReturn({sale_id, isModalOpen, setIsModalOpen, setReturnRefundSucces, setReloadData, reloadData}) {

  const [refundSet, setRefundSet] = useState({
    comment: '',
    amount: ''
  });

  function handleChange(event) {
    setRefundSet({...refundSet, [event.target.name]: event.target.value});
  }

  const accountId = document.cookie
    .split("; ")
    .find((row) => row.startsWith("account_id="))
    ?.split("=")[1];
  
  // Dito yung return form submit function
  function handleSubmit(e) {
    e.preventDefault();

    const refundReturnForm = document.getElementById('refundReturnForm')
    const formData = new FormData(refundReturnForm)

    let newFormData = {
      ...formData,
      action: 'refundReturn',
      account_id: accountId
    }

    fetch(`/api/return/${sale_id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newFormData)
    })

    console.log(refundSet)
    setReturnRefundSucces(true)
    setIsModalOpen(false)
    setReloadData(!reloadData);

  }

  return (
    <div className="fixed backdrop-blur-sm -translate-x-56 bg-black/20 drop-shadow-xl  z-50">
        <Modal isOpen={isModalOpen}>
          <div className="h-screen w-screen  flex justify-center items-center backdrop-blur-sm bg-white/30 ">
            <form onSubmit={handleSubmit} id="refundReturnForm" className="fixed bg-gray-100 -mt-20 rounded-xl w-[40rem]">
                <div className="flex flex-col gap-5 text-center py-5 px-10">
                  <div className="text-2xl font-bold">
                    Refund Return Form
                  </div>
                  <div className="flex flex-col gap-5">

                    <div className="flex flex-col gap-2">
                      <div className="text-md text-left font-bold">
                        Amount
                      </div>
                      <div>
                        <input name="refundAmount" onChange={handleChange} type="number" className="w-full border-2 border-black/60 rounded-md p-2" required/>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="text-md text-left font-bold">
                        Comments
                      </div>
                      <div>
                        <textarea name="comment" type="text" onChange={handleChange} className="w-full h-44 border-2 border-black/60 rounded-md p-2 resize-none" required/>
                      </div>
                    </div>

                    <div className="flex flex-row gap-1">
                    <button type="button" onClick={() =>  setIsModalOpen(false)} className="bg-black/80 hover:bg-black text-gray-50 p-2 rounded-md w-1/2 font-medium">Cancel</button>
                    <button type="submit" className="bg-green-900/80 hover:bg-green-900 text-gray-50 p-2 rounded-md w-full font-medium">Submit</button>
                    </div>
                  </div>
                </div>
            </form>
          </div>
        </Modal>
      </div>
  );
};

function RejectRefund({sale_id, isModalOpen, setIsModalOpen, setRejectSucces, setReloadData, reloadData}) {

  const [comment, setComment] = useState("")

  function handleChange(event) {
    setComment({...comment, [event.target.name]: event.target.value});
  }

  const accountId = document.cookie
  .split("; ")
  .find((row) => row.startsWith("account_id="))
  ?.split("=")[1];
  
  // Dito yung return form submit function
  function handleSubmit(e) {
    e.preventDefault();

    const rejectForm = document.getElementById('rejectForm')
    const formData = new FormData(rejectForm)

    let newFormData = {
      ...formData,
      action: 'reject',
      account_id: accountId
    }

    fetch(`/api/return/${sale_id}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newFormData)
    })

    console.log(comment)
    setRejectSucces(true)
    setIsModalOpen(false)
    setReloadData(!reloadData);

  }

  return (
    <div className="fixed backdrop-blur-sm -translate-x-56 bg-black/20 drop-shadow-xl  z-50">
        <Modal isOpen={isModalOpen}>
          <div className="h-screen w-screen  flex justify-center items-center backdrop-blur-sm bg-white/30 ">
            <form onSubmit={handleSubmit} id="rejectForm" enctype="multipart/form-data" className="fixed bg-gray-100 -mt-20 rounded-xl w-[40rem]">
                <div className="flex flex-col gap-5 text-center py-5 px-10">
                  <div className="text-2xl font-bold">
                    Reject Form
                  </div>
                  <div className="flex flex-col gap-5">

                    <div className="flex flex-col gap-2">
                      <div className="text-md text-left font-bold">
                        Comments
                      </div>
                      <div>
                        <textarea name="comment" type="text" onChange={handleChange} className="w-full h-44 border-2 border-black/60 rounded-md p-2 resize-none" required/>
                      </div>
                    </div>

                    <div className="flex flex-row gap-1">
                    <button type="button" onClick={() =>  setIsModalOpen(false)} className="bg-black/80 hover:bg-black text-gray-50 p-2 rounded-md w-1/2 font-medium">Cancel</button>
                    <button type="submit" className="bg-green-900/80 hover:bg-green-900 text-gray-50 p-2 rounded-md w-full font-medium">Submit</button>
                    </div>
                  </div>
                </div>
            </form>
          </div>
        </Modal>
      </div>
  );
};