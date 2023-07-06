import React from "react";
import { Link } from "react-router-dom";

function UserDropdown() {

    return (

        <div id="userDropdown" className="transition duration-500 ease-in-out z-50 absolute translate-x-[26rem] translate-y-2 mt-14 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="flex justify-start items-start pl-5 flex-col py-3 border-b ">
            <div className="text-xl">username</div>
                <div className="text-xs">@Persons Email</div>
            </div>
            <div className="flex justify-start flex-col py-1 pl-5 items-start">
                <Link to="/user/profile" className="block py-2 text-sm text-gray-700 hover:font-bold">Your Profile</Link>
                <Link to="/orders" className="block py-2 text-sm text-gray-700 hover:font-bold">Orders</Link>
                <Link to="/user/settings" className="block py-2 text-sm text-gray-700 hover:font-bold">Settings</Link>
                <Link to="/user/signout" className="block py-2 text-sm text-gray-700 hover:font-bold">Sign out</Link>
            </div>
        </div>

    );


    }



export default UserDropdown;