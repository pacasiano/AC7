import React, { useState } from "react";
import '../App.css';
import navlogo from "../imgs/navlogo.png";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Inventory from "../components/inventory";
import Orders from "../components/orders";
import Users from "../components/users";
import Shipping from "../components/shipping";
import InventoryIn from "../components/InventoryIn";

export default function Admin() {

    const [page, setPage] = useState("inventory");

    return (
        <div>
            <div className="h-screen w-screen fixed">
                <div className="flex flex-row" >
                    <div id="sideBar" className="flex flex-col bg-gray-200 w-52 h-screen">
                        <img src={navlogo} alt="AC7 Logo" className="py-5 aspect-auto"></img>
                            <div className="flex flex-col pl-7 gap-5">
                                <div id="orders" className="">
                                    <button onClick={() => setPage("orders")}>
                                    <div className="text-xl font-semibold"><FontAwesomeIcon icon={faShoppingCart} /> Orders</div>
                                    </button>
                                </div>
                                <div id="accounts" className="">
                                    <button onClick={() => setPage("users")} >
                                    <div className="text-xl font-semibold"><FontAwesomeIcon icon={faUsers} /> Accounts</div>
                                    </button>
                                </div>
                                <div id="inventory" className="">
                                    <button onClick={() => setPage("inventory")} >
                                    <div className="text-xl font-semibold"><FontAwesomeIcon icon={faInbox} /> Inventory</div>
                                    </button>
                                    <div className="flex justify-center">
                                        <button onClick={() => setPage("inventoryIn")} >
                                        <div className="text-md italic font-normal">Add Item</div>
                                        </button>
                                    </div>
                                </div>
                                <div id="shipping" className="">
                                    <button onClick={() => setPage("shipping")} >
                                    <div className="text-xl font-semibold"><FontAwesomeIcon icon={faTruck} /> Shipping</div>
                                    </button>
                                </div>
                            </div>
                    </div>
                    <div id="body" className="w-full ">
                    {(() => {
                            switch (page) {
                                case "inventory":
                                    return <Inventory />;
                                case "orders":
                                    return <Orders />;
                                case "users":
                                    return <Users />;
                                case "shipping":
                                    return <Shipping />;
                                case "inventoryIn":
                                    return <InventoryIn />;
                                default:
                                    return <Inventory />;
                            }
                        })()}
                    </div>
                </div>
            </div>
        </div>
    );

}
