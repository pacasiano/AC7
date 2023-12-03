import React, { useState } from "react";
import '../App.css';
import navlogo from "../imgs/navlogo.png";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faIndustry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Inventory from "../components/inventory";
import Orders from "../components/orders";
import Users from "../components/users";
import Shipping from "../components/shipping";
import InventoryIn from "../components/InventoryIn";
import AddItem from "../components/addItem";
import InventoryOut from "../components/inventoryOut";
import InventoryTransactions from "../components/inventoryTransactions";
import AddEmployee from "../components/addEmp";
import ViewSuppliers from "../components/supplier";
import AddSupplier from "../components/supplierAdd";
import Returned from "../components/ordersReturns";
import { myContext } from "../context/adminContext";
import { Link } from "react-router-dom";

export default function Admin() {

    const [page, setPage] = useState("orders");

    function removeCookie() {
        document.cookie = "account_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setTimeout(() => {
            window.location.reload();
        }, 0);
      }

    const inventory = ["inventory", "addItem", "inventoryIn", "inventoryOut", "inventoryTransactions"]
    const isInInventory = inventory.some((item) => page.includes(item));

    return (
        <div className="transition-all ease-in">
            <div className="min-h-screen w-screen ">
                <div className="flex flex-row" >
                    <div id="sideBar" className="fixed h-screen overflow-y-auto scrolling-sidebar flex flex-col bg-gray-200 w-52">
                        <img src={navlogo} alt="AC7 Logo" className="py-5 aspect-auto"></img>
                            <div className="flex flex-col justify-between h-full">
                                <div className="px-7">
                                    <div className="flex flex-col gap-1">
                                        <div id="orders" className={`${(page === "orders"||page==="returned") && "bg-black/10"} transition-all hover:bg-black/10 active:bg-black/20 rounded-xl p-2`}>
                                            <button onClick={() => setPage("orders")}>
                                            <div className="text-xl font-semibold"><FontAwesomeIcon icon={faShoppingCart} /> Orders</div>
                                            </button>
                                        </div>
                                        <div id="accounts" className={`${(page === "users"||page==="addEmployee") && "bg-black/10"} transition-all hover:bg-black/10 active:bg-black/20 rounded-xl p-2`}>
                                            <button onClick={() => setPage("users")} >
                                            <div className="text-xl font-semibold"><FontAwesomeIcon icon={faUsers} /> Accounts</div>
                                            </button>
                                        </div>
                                        <div id="inventory" className={`${isInInventory && "bg-black/10 "} transition-all hover:bg-black/10 active:bg-black/20 rounded-xl p-2`}>
                                            <button onClick={() => setPage("inventory")} >
                                            <div className="text-xl font-semibold"><FontAwesomeIcon icon={faInbox} /> Inventory</div>
                                            </button>
                                        </div>
                                        <div id="shipping" className={`${page === "shipping" && "bg-black/10"} transition-all hover:bg-black/10 active:bg-black/20 rounded-xl p-2`}>
                                            <button onClick={() => setPage("shipping")} >
                                            <div className="text-xl font-semibold"><FontAwesomeIcon icon={faTruck} /> Shipping</div>
                                            </button>
                                        </div>
                                        <div id="suppliers" className={`${(page === "viewSuppliers" || page === "addSupplier") && "bg-black/10 "} transition-all hover:bg-black/10 active:bg-black/20 rounded-xl p-2`}>
                                            <button onClick={() => setPage("viewSuppliers")} >
                                            <div className="text-xl font-semibold"><FontAwesomeIcon icon={faIndustry} /> Suppliers</div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full pl-7 pb-7">
                                    <Link to="/" onClick={removeCookie} className="text-xl font-bold text-black hover:bg-gray-50 rounded-md py-1 px-2">Sign out</Link>
                                </div>
                            </div>
                    </div>
                    <div id="body" className="w-full pl-56 ">
                    <myContext.Provider value={{page, setPage}}>
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
                                case "inventoryOut":
                                    return <InventoryOut />;
                                case "addItem":
                                    return <AddItem />;
                                case "inventoryTransactions":
                                    return <InventoryTransactions />;
                                case "addEmployee":
                                    return <AddEmployee />;
                                case "viewSuppliers":
                                    return <ViewSuppliers />;
                                case "addSupplier":
                                    return <AddSupplier />;
                                case "returned":
                                    return <Returned />;
                                default:
                                    return <Inventory />;
                            }
                        })()}
                    </myContext.Provider>
                    </div>
                </div>
            </div>
        </div>
    );

}
