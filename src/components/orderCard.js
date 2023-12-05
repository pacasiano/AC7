import React, { useState, useEffect} from 'react';
import "../App.css";
import Item1 from "../imgs/Item1.png";
import { Link } from "react-router-dom";

function OrderCard({sale_id, sale_date, sale_status, shipped_date, received_date, cancelled_date, total}) {

    const [items, setItems] = useState([]);

    useEffect(() => {
    fetch(`/api/orders/sale_items/${sale_id}`)
        .then((res) => res.json())
        .then((items) => {
        console.log(items);
        setItems(items);
        })
        .catch((err) => {
        console.error("Error: ", err);
        });
    }, [sale_id]); 

    return (
        <Link to={`/orders/${sale_id}`} className="bg-gray-100 p-5 h-34 hover:shadow-md hover:cursor-pointer transition-all">
            <div className="flex flex-col">
                <div className="flex flex-row gap-4">
                    <div className="w-28">
                        <img className="object-cover w-44 resize-none rounded-md" src={Item1} alt="Item1" />
                    </div>
                    <div className="flex flex-col w-1/2 ">
                        <h2 className="text-md font-medium pb-1">Order Reference # <span className="text-black">{sale_id}</span></h2>
                        <div className="flex md:flex-row flex-col gap-5 h-full items-start whitespace-nowrap">
                            <div className="flex flex-col justify-start items-start border-l-2 pl-2 h-full items w-48">
                                {items.map((item) => {
                                    return (
                                    <h2 className="text-sm font-normal text-left">{item.name}</h2>
                                    )
                                })}
                            </div>
                            <div className="flex flex-col justify-start items-start pl-2 border-l-2 h-full">
                                <p className="text-xs font-normal text-start">Date ordered: <span className="text-xs font-semibold">{sale_date}</span></p>
                                <p className="text-xs font-normal text-start">Order Status: <span className="text-xs font-semibold 	text-transform: capitalize">{sale_status}</span></p>
                                {!(sale_status === "packed" || sale_status === "cancelled" || sale_status === "processing order") && <p className="text-xs font-normal text-start">Shipped Date: <span className="text-xs font-semibold">{shipped_date}</span></p>}
                                {sale_status === "cancelled" && <p className="text-xs font-normal text-start">Cancelled Date: <span className="text-xs font-semibold">{cancelled_date}</span></p>}
                                {(sale_status ===  "completed") && <p className="text-xs font-normal text-start">Received Date: <span className="text-xs font-semibold">{received_date}</span></p>}
                                <p className="text-xs font-normal text-start">Total: <span className="text-xs font-semibold">{total}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default OrderCard;
