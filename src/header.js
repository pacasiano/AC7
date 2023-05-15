import React from "react";
import navlogo from "./navlogo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './App.css';

function header() {
    return (
        <div className="header">
            <header className="w-full top-0">
            <div className="flex justify-between items-stretch bg-gray-100 text-md">
                <div className="flex jusitfy-evenly gap-4 pl-3 font-bold">
                    <img src={navlogo} className="object-fill h-12" alt="logo"/>
                    <div className="flex items-center m-0">Menu</div>
                    <div className="flex items-center m-0">Store</div>
                    <div className="flex items-center m-0">About</div>
                </div>
                <div className="flex jusitfy-evenly gap-4 pr-7">
                    <div className="relative">
                        <div className="absolute inset-y-[10px] left-4 items-center text-xl m-0"><FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#000000",}} /></div>
                        <input type="search" className="flex items-center rounded-md caret-black pl-8 pr-2 m-3 text-base focus:outline-none" placeholder="Search"/>
                    </div>
                    <div className="flex items-center text-xl m-0"><FontAwesomeIcon icon={faCartShopping} style={{color: "#000000",}} /></div>
                    <div className="flex items-center text-xl m-0"><FontAwesomeIcon icon={faUser} style={{color: "#000000",}} /></div>
                </div>
            </div>
            </header>
        </div>
        
      );
}

export default header;