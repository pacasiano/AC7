import React, {useState, useEffect}from "react";
import { MdRefresh } from "react-icons/md";
import { Link } from "react-router-dom";




function UserDropdown() {
    //GET ACCOUNT_ID COOKIE
    const cookie = document.cookie;
    function getAcctIdFromCookie (cookieStr) {
        //if browser has more than one cookie, the if statement will run
        if (cookieStr.indexOf(';') > 0) {
            //document.cookie is a string. We use .split() to convert it to an array with each cookie being an element
            const cookiesArray = cookieStr.split(';');
            for(let i = 0; i < cookiesArray.length; i++) {
                if (cookiesArray[i].indexOf('account_id') > 0) {
                    //find the cookie with 'account_id' substring
                    const id = cookiesArray[i].replace('account_id=', '').trim();
                    // console.log(id)
                    return id;
                }
            }
        }
        else {
            const id = cookie.slice(cookie.indexOf('=')+1);
            // console.log(id)
            return id;
        }
    }
    const accountId = getAcctIdFromCookie(cookie);
    
    const [userData, setUserData] = useState([]);

    
    useEffect(() => {
        fetch(`/api/profile/${accountId}`)
        .then((res) => res.json())
        .then((userData) => {
            setUserData(userData);
        });
    }, []);

    const {first_name, email} = userData[0] || {};

    function removeCookie() {
        document.cookie = "account_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/";
        setTimeout(() => {
          window.location.reload();
        }, 0);
      }
      


    return (
        <div id="userDropdown" className="transition duration-500 ease-in-out z-50 absolute translate-x-[26rem] translate-y-2 mt-14 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="flex justify-start items-start pl-5 flex-col py-3 border-b ">
                <div className="text-xl">{first_name}</div>
                <div className="text-xs">{email}</div>
            </div>
            <div className="flex justify-start flex-col py-1 pl-5 items-start">
                <Link to="/user/profile" className="block py-2 text-sm text-gray-700 hover:font-bold">Your Profile</Link>
                <Link to="/orders" className="block py-2 text-sm text-gray-700 hover:font-bold">Orders</Link>
                {/* <Link to="/user/settings" className="block py-2 text-sm text-gray-700 hover:font-bold">Settings</Link> */}
                <Link to="/" onClick={removeCookie} className="block py-2 text-sm text-gray-700 hover:font-bold">Sign out</Link>
            </div>
        </div>
    );
}

export function userDropdown() {
    var element = document.getElementById("userDropdown");
    if (element.classList.contains("translate-x-[60%]")) {
        element.classList.remove("translate-x-[60%]");
        element.classList.add("translate-x-[26rem]");
    }
    else {
        element.classList.remove("translate-x-[26rem]");
        element.classList.add("translate-x-[60%]");
    }
}



export default UserDropdown;