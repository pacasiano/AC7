import React, { useState, useEffect } from 'react';
import "../App.css";
import Item1 from "../imgs/Item1.png";
import { Link } from "react-router-dom";


export default function OnGoing() {
    //GET ACCOUNT_ID COOKIE
    const cookie = document.cookie;
    function getAcctIdFromCookie(cookieStr) {
        //if browser has more than one cookie, the if statement will run
        if (cookieStr.indexOf(';') > 0) {
            //document.cookie is a string. We use .split() to convert it to an array with each cookie being an element
            const cookiesArray = cookieStr.split(';');
            for (let i = 0; i < cookiesArray.length; i++) {
                if (cookiesArray[i].indexOf('account_id') > 0) {
                    //find the cookie with 'account_id' substring
                    const id = cookiesArray[i].replace('account_id=', '').trim();
                    // console.log(id)
                    return id;
                }
            }
        }
        else {
            const id = cookie.slice(cookie.indexOf('=') + 1);
            // console.log(id)
            return id;
        }
    }

    const accountId = getAcctIdFromCookie(cookie);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`/api/orders/${accountId}`)
            .then((res) => res.json())
            .then((orders) => {
                setOrders(orders);
            });
    }, []);

    const orderCards = orders.slice(0, 2).map((order) => {
        if(order.sale_status=="complete"){
            return ( 
                <Link to={"/order"} className="bg-gray-100 p-5 hover:-translate-y-1 hover:shadow-xl hover:cursor-pointer">
                    <div className="flex flex-col">
                        <div className="flex flex-row gap-4">
                            <div className="flex">
                                <img className="object-cover resize-none w-24 rounded-md" src={Item1} alt="Item1" />
                            </div>
                            <div className="flex flex-col justify-start items-start w-56 text-clip ">
                                <h2 className="text-md font-semibold text-center pb-1">{order.sale_id}</h2>
                                <p className="text-xs font-medium text-start">Date ordered: <span className="text-xs font-semibold"></span></p>
                                <p className="text-xs font-medium text-start">Date Delivered: <span className="text-xs font-semibold"></span></p>
                                <p className="text-xs font-medium text-start">Order Status: <span className="text-xs font-semibold">{order.sale_status}</span></p>
                                <p className="text-xs font-medium text-start">Total: <span className="text-xs font-semibold">Php</span></p>
                            </div>
                        </div>
                    </div>
                </Link>
            );
        }  
        });
    return (
        <div className="flex flex-col gap-4">
        {orderCards}
        </div>
    );
}
