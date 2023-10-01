import React, {useState} from "react";
import "../App.css";
import Item1 from "../imgs/Item1.png";
import { Link } from "react-router-dom";

export default function OrderCard() {

    const [orders, setOrders] = useState(
        [
            {
                id: 1,
                name: "ID 9234234",
                dateOrdered: "October 1, 2021",
                dateDelivered: "",
                status: "On Transit",
                total: 100,
                image: Item1
            },
            {
                id: 1,
                name: "ID 934234",
                dateOrdered: "October 1, 2021",
                dateDelivered: "",
                status: "On Transit",
                total: 100,
                image: Item1
            },
            {
                id: 1,
                name: "id 429592",
                dateOrdered: "October 1, 2021",
                dateDelivered: "",
                status: "On Transit",
                total: 100,
                image: Item1
            },
            {
                id: 1,
                name: "Beauty Product",
                dateOrdered: "October 1, 2021",
                dateDelivered: "",
                status: "On Transit",
                total: 100,
                image: Item1
            },
            {
                id: 1,
                name: "Beauty Product",
                dateOrdered: "October 1, 2021",
                dateDelivered: "",
                status: "On Transit",
                total: 100,
                image: Item1
            },
            {
                id: 1,
                name: "Beauty Product",
                dateOrdered: "October 1, 2021",
                dateDelivered: "",
                status: "On Transit",
                total: 100,
                image: Item1
            },
    
        ]
    );

    const orderCards = orders.slice(0, 3).map((order) => {

        return ( 

            <Link to={"/order"} className="bg-gray-100 p-5 hover:-translate-y-1 hover:shadow-xl hover:cursor-pointer">
                <div className="flex flex-col">
                    <div className="flex flex-row gap-4">
                        <div className="flex">
                            <img className="object-cover resize-none w-24 rounded-md" src={Item1} alt="Item1" />
                        </div>
                        <div className="flex flex-col justify-start items-start w-56 text-clip ">
                            <h2 className="text-md font-semibold text-center pb-1">{order.name}</h2>
                            <p className="text-xs font-medium text-start">Date ordered: <span className="text-xs font-semibold">{order.dateOrdered}</span></p>
                            <p className="text-xs font-medium text-start">Date Delivered: <span className="text-xs font-semibold">{order.dateDelivered}</span></p>
                            <p className="text-xs font-medium text-start">Order Status: <span className="text-xs font-semibold">{order.status}</span></p>
                            <p className="text-xs font-medium text-start">Total: <span className="text-xs font-semibold">Php {order.total}</span></p>
                        </div>
                    </div>
                </div>
            </Link>

        );

    });
    
    return (

        <div className="flex flex-col gap-4">
        {orderCards}
        </div>

    );

}
