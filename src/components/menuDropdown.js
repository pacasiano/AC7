import React from "react";
import Search from "./searchbar";
import {Link} from "react-router-dom";

function MenuDropdown() {

    return (

        <div id="menuButton" className="fixed -translate-y-12 transition duration-500 ease-in-out md:hidden bg-gray-50 z-10 pl-3 p-0 w-full top-12 shadow-sm">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row justify-start gap-3 w-1/2">
                    <CustomLink to="/home" className="flex items-center m-0 font-bold" >Menu</CustomLink>
                    <CustomLink to="/store" className="flex items-center m-0 font-bold">Store</CustomLink>
                    <CustomLink to="/about" className="flex items-center m-0 font-bold">About</CustomLink>
                </div>
                <div className="flex justify-end items-center w-1/2">
                    <Search/>
                </div>
            </div>
        </div>

    );
}

function CustomLink({to, children, className}) {
    return (
        <Link to={to} className={className+" transition ease-out duration-500 hover:bg-gray-300 my-2 px-2 rounded-md"}>{children}</Link>
    );
}

export default MenuDropdown;