import React, {useState} from "react";
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

    // const [cookies, setCookies] = useState(document.cookie);

    // const handleSubmit = async (event) => {
    // event.preventDefault();

    // const formData = new FormData(event.target);

    // try {
    //     const response = await fetch('/api/cart', {
    //         method: 'POST',
    //         body: formData,
    //         headers: {
    //         'Cookie': cookies, // Include cookies in the headers
    //         },
    //     });

    //     if (response.ok) {
    //         // Handle a successful response from the server
    //         console.log('Form submitted successfully.');
    //     } else {
    //     // Handle errors here
    //     console.error('Error:', response.statusText);
    //     }
    // } 
    // catch (error) {
    //     console.error('Error:', error);
    // }};

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
                    
                <div className="flex jusitfy-evenly gap-2 pr-4 md:gap-4 md:pr-7 -ml-[90%]">
                    <div className="flex items-center md:visible collapse h-full">
                        <Search/>
                    </div>
                    {/* <form id="myForm" className="flex items-center text-xl m-0" action="/api/cart" method="POST">
                        <CustomLink to="/api/cart/5"><FontAwesomeIcon icon={faCartShopping} style={{color: "#000000",}} onClick={() => {document.getElementById("myForm").submit();}} /></CustomLink>
                    </form> */}
                    <CustomLink to="/cart" className="flex items-center text-xl m-0"><FontAwesomeIcon icon={faCartShopping} style={{color: "#000000",}} /></CustomLink>
                    <button onClick={userDropdown} className="flex cursor-pointer items-center text-xl transition ease-out duration-500 hover:bg-gray-300 my-2 px-2 rounded-md"><FontAwesomeIcon icon={faUser} style={{color: "#000000",}} /></button>
                    <UserDropdown
                    />
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