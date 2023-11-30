import React, { useState} from 'react';
import "../App.css";
import Item1 from "../imgs/Item1.png";
import { Link } from "react-router-dom";

function Complete({sale_id, sale_date, sale_status, received_date, total}) {

    fetch(`/api/orders/sale_item/${sale_id}`)
    .then(res => res.json())
    .then(data => console.log(data))

    return ( 
        <Link to={`/orders/${sale_id}`} className="bg-gray-100 p-5 hover:shadow-xl hover:bg-neutral-100 hover:cursor-pointer">
            <div className="flex flex-col">
                <div className="flex flex-row gap-4">
                    <div className="flex">
                        <img className="object-cover resize-none w-24 rounded-md" src={Item1} alt="Item1" />
                    </div>
                    <div className="flex flex-col justify-start items-start w-56 text-clip ">
                        <h2 className="text-md font-semibold text-center pb-1">{sale_id}</h2>
                        <p className="text-xs font-medium text-start">Date ordered: <span className="text-xs font-semibold">{sale_date}</span></p>
                        <p className="text-xs font-medium text-start">Date Delivered: <span className="text-xs font-semibold">{received_date}</span></p>
                        <p className="text-xs font-medium text-start">Order Status: <span className="text-xs font-semibold">{sale_status}</span></p>
                        <p className="text-xs font-medium text-start">Total: <span className="text-xs font-semibold">{total}</span></p>
                    </div>
                </div>
            </div>
        </Link>
    );
}  

function OnGoing({sale_id, sale_date, sale_status, received_date, total}) {

    const [items, setItems] = useState([]);

    fetch(`/api/orders/sale_item/${sale_id}`)
    .then(res => res.json())
    .then(data => setItems(data))
    console.log(items)

    return (
        <Link to={`/orders/${sale_id}`} className="bg-gray-100 p-5 hover:shadow-xl hover:bg-neutral-100 hover:cursor-pointer">
            <div className="flex flex-col">
                <div className="flex flex-row gap-4">
                    <div className="flex">
                        <img className="object-cover resize-none w-24 rounded-md" src={Item1} alt="Item1" />
                    </div>
                    <div className="flex flex-col justify-start items-start w-56 text-clip ">
                        <h2 className="text-md font-semibold text-center pb-1">{sale_id}</h2>
                        {/* {items.map((item) => {
                            return (
                            <h2 className="text-md font-semibold text-center pb-1">{item.name}</h2> 
                            )
                        })} */}
                        <p className="text-xs font-medium text-start">Date ordered: <span className="text-xs font-semibold">{sale_date}</span></p>
                        <p className="text-xs font-medium text-start">Order Status: <span className="text-xs font-semibold">{sale_status}</span></p>
                        <p className="text-xs font-medium text-start">Total: <span className="text-xs font-semibold">{total}</span></p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

function Cancelled({sale_id, sale_date, sale_status, received_date, total}) {
    return ( 
        <Link to={`/orders/${sale_id}`} className="bg-gray-100 p-5 hover:shadow-xl hover:bg-neutral-100 hover:cursor-pointer">
            <div className="flex flex-col">
                <div className="flex flex-row gap-4">
                    <div className="flex">
                        <img className="object-cover resize-none w-24 rounded-md" src={Item1} alt="Item1" />
                    </div>
                    <div className="flex flex-col justify-start items-start w-56 text-clip ">
                        <h2 className="text-md font-semibold text-center pb-1">{sale_id}</h2>
                        <p className="text-xs font-medium text-start">Date ordered: <span className="text-xs font-semibold">{sale_date}</span></p>
                        <p className="text-xs font-medium text-start">Date Delivered: <span className="text-xs font-semibold">{received_date}</span></p>
                        <p className="text-xs font-medium text-start">Order Status: <span className="text-xs font-semibold">{sale_status}</span></p>
                        <p className="text-xs font-medium text-start">Total: <span className="text-xs font-semibold">{total}</span></p>
                    </div>
                </div>
            </div>
        </Link>
    );
}  

export {Complete, OnGoing, Cancelled};
