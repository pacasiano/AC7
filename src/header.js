import React from "react";
import navlogo from "./navlogo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function header() {
    return (
        <div className="header">
            <header className="w-full top-0">
            <div className="flex justify-between items-stretch bg-gray-100 text-md">
                <div className="flex jusitfy-evenly gap-4 pl-3 font-bold lg:visible md:visible invisible">
                    <div className="flex items-center m-0 visible md:invisible md:pl-0 pl-2"><FontAwesomeIcon icon={faBars} style={{color: "#000000",}} /></div>
                    <img src={navlogo} className="object-fill h-12 visible md:-ml-10 -ml-2" alt="logo"/>
                    <CustomLink href="/" className="flex items-center m-0" >Menu</CustomLink>
                    <CustomLink href="/Store" className="flex items-center m-0">Store</CustomLink>
                    <CustomLink href="/About" className="flex items-center m-0">About</CustomLink>
                </div>
                <div className="flex jusitfy-evenly gap-7 pr-7">
                    <div className="relative">
                        <div className="absolute inset-y-[10px] left-4 items-center text-xl m-0"><FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#000000",}} /></div>
                        <input type="search" className="flex items-center rounded-md caret-black pl-8 pr-2 m-3 text-base focus:outline-none" placeholder="Search"/>
                    </div>
                    <CustomLink href="/Cart" className="flex items-center text-xl m-0"><FontAwesomeIcon icon={faCartShopping} style={{color: "#000000",}} /></CustomLink>
                    <div onClick={UserDropdown} className="flex cursor-pointer items-center text-xl m-0"><FontAwesomeIcon icon={faUser} style={{color: "#000000",}} /></div>
                    <div id="userDropdown" className="hidden z-10 absolute right-2 mt-14 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="flex justify-start items-start pl-5 flex-col py-3 border-b ">
                            <div className="text-xl">username</div>
                            <div className="text-xs">@Persons Email</div>
                        </div>
                        <div className="flex justify-start flex-col py-1 pl-5 items-start">
                            <a href="/user/Profile" className="block py-2 text-sm text-gray-700 hover:font-bold">Your Profile</a>
                            <a href="/user/Order" className="block py-2 text-sm text-gray-700 hover:font-bold">Orders</a>
                            <a href="/user/Settings" className="block py-2 text-sm text-gray-700 hover:font-bold">Settings</a>
                            <a href="/user/Signout" className="block py-2 text-sm text-gray-700 hover:font-bold">Sign out</a>
                        </div>
                    </div>
                </div>
            </div>
            </header>
        </div>
        
      );
}

function CustomLink({href, children, className}) {
    return (
        <a href={href} className={className}>{children}</a>
    );
}

function UserDropdown() {
    document.getElementById("userDropdown").classList.toggle("hidden");
}

export default header;