import React from "react";
import navlogo from "../imgs/navlogo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import UserDropdown from "./userDropdown";
import MenuDropdown from "./menuDropdown";
import { menuDropdown } from "./menuDropdown";
import { userDropdown } from "./userDropdown";
import Search from "./searchbar";
import '../App.css';

function Header() {

    return (
        <div className="header">
            <header className="w-full fixed top-0 z-50 shadow-sm">
            <div className="flex relative justify-between items-stretch bg-gray-100 text-md">
                <div className="flex jusitfy-evenly gap-4 pl-3 font-bold md:visible invisible">
                    <button onClick={menuDropdown} className="visible md:invisible flex items-center lg:m-0 md:pl-0 pr-2 pl-2"><FontAwesomeIcon icon={faBars} style={{color: "#000000",}} /></button>
                    <img src={navlogo} className="object-cover w-11 pl-0 h-12 visible md:-ml-10 -ml-2" alt="logo"/>
                    <CustomLink to="/home" className="flex items-center m-0" >Menu</CustomLink>
                    <CustomLink to="/store" className="flex items-center m-0">Store</CustomLink>
                    <CustomLink to="/about" className="flex items-center m-0">About</CustomLink>
                </div>
                    
                <div className="flex flex-row justify-end gap-4 pr-4">
                    <div className="flex justify-center items-center md:visible collapse h-full md:w-60 w-0">
                        <Search/>
                        {/* <Select/> */}
                    </div>
                    <div className="flex flex-row gap-4">
                    <CustomLink to="/cart" className="flex items-center text-xl m-0"><FontAwesomeIcon icon={faCartShopping} style={{color: "#000000",}} /></CustomLink>
                    <button onClick={userDropdown} className="flex cursor-pointer items-center text-xl transition ease-out duration-500 hover:bg-gray-300 my-2 px-2 rounded-md"><FontAwesomeIcon icon={faUser} style={{color: "#000000",}} /></button>
                    </div>
                    <UserDropdown/>
                </div>
            </div>
            </header>
            <MenuDropdown

            />
        </div>
        
      );
}

function CustomLink({to, children, className}) {
    return (
        <Link to={to} className={className+" transition ease-out duration-500 hover:bg-gray-300 my-2 px-2 rounded-md"}>{children}</Link>
    );
}

export default Header;