import React, { useState, useEffect } from "react";
import { get } from "react-hook-form";

export default function Settings() {

    const [isAdd, setAdd] = useState(false);

    const toggleAdd = () => {
        setAdd(!isAdd);
    };

    const [isEditAccInfo, setEditAccInfo] = useState(false);

    const toggleEditAccInfo = () => {
        setEditAccInfo(!isEditAccInfo);
    }
    const [isEditPersonalInfo, setEditPersonalInfo] = useState(false);

    const toggleEditPersonalInfo = () => {
        setEditPersonalInfo(!isEditPersonalInfo);
    }

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

    //the userData[0] || {} syntax ensures that we only destructure once userData contains some data returned by fetch
    //if it is still undefined (fetch has not returned anything), it will default to an empty object - this prevents errors related to undefined values
    const {email, username, password, first_name, middle_name, last_name, contact_info} = userData[0] || {};

    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        fetch(`/api/address/${accountId}`)
        .then((res) => res.json())
        .then((address) => {
            setAddresses(address);
        });
    }, []);

    //when save is clicked, it should also send a get request to check if the username already exists

    //useStates, useEffects, and eventHandlers for editting account information
    const [edit_email, setEdit_email] = useState(email);
    useEffect(() => {
        setEdit_email(email);
      }, [email]);
    function handleEditEmail(event) {
        setEdit_email(event.target.value ? event.target.value : email)
    }

    const [edit_username, setEdit_username] = useState(username);
    useEffect(() => {
        setEdit_username(username);
      }, [username]);
    function handleEditUsername(event) {
        setEdit_username(event.target.value ? event.target.value : username)
    }

    const [edit_password, setEdit_password] = useState(password);
    useEffect(() => {
        setEdit_password(password);
      }, [password]);
    function handleEditPassword(event) {
        setEdit_password(event.target.value ? event.target.value : password)
    }

    function editAccountInfo() {
        fetch(`/api/account/${accountId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: edit_email,
                username: edit_username,
                password: edit_password
            })
        })
        .then(res => res.json)
        .then(data => {
            console.log(data)
        })
        .catch(err => console.error(err))
    }

    
    //useStates, useEffects, and eventHandlers for editting personal information
    const [edit_first_name, setEdit_first_name] = useState(first_name);
    useEffect(() => {
        setEdit_first_name(first_name);
      }, [first_name]);
    function handleEditFirstName(event) {
        setEdit_first_name(event.target.value ? event.target.value : first_name) 
        //if event.target.value is empty, set first_name to the original first_name value that was taken from db
    }

    const [edit_last_name, setEdit_last_name] = useState(last_name);
    useEffect(() => {
        setEdit_last_name(last_name);
      }, [last_name]);
    function handleEditLastName(event) {
        setEdit_last_name(event.target.value ? event.target.value : last_name)
    }

    const [edit_middle_name, setEdit_middle_name] = useState(middle_name);
    useEffect(() => {
        setEdit_middle_name(middle_name);
      }, [middle_name]);
    function handleEditMiddleName(event) {
        setEdit_middle_name(event.target.value ? event.target.value : middle_name)
    }

    const [edit_contactNo, setEdit_contactNo] = useState(contact_info);
    useEffect(() => {
        setEdit_contactNo(contact_info);
      }, [contact_info]);
    function handleEditContactNo(event) {
        setEdit_contactNo(event.target.value ? event.target.value : contact_info)
    }

    function editPersonalInfo() {
        fetch(`/api/customer/${accountId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name: edit_first_name,
                middle_name: edit_middle_name,
                last_name: edit_last_name,
                contact_info: edit_contactNo
            })
        })
        .then(res => res.json)
        .then(data => {
            console.log(data)
        })
        .catch(err => console.error(err))
    }


  return(
    <div className="w-full h-screen pt-16">
        <div className="pt-12 flex flex-row justify-center gap-5">
            <div className="bg-gray-100 w-1/4 px-5 pt-6 pb-10">
                <div className="text-2xl font-bold pb-4">Profile</div>

                {/* Account Information */}
                <div className="px-1">
                    <div className="flex flex-row pb-4 gap-2">
                        <div className="text-md font-bold">Account Information</div>
                        <button onClick={toggleEditAccInfo} className="bg-slate-800 text-white px-2 text-xs rounded">{isEditAccInfo ? 'Cancel' : 'Edit'}</button>
                        {isEditAccInfo && <button onClick={editAccountInfo} className="bg-slate-800 text-white px-2 text-xs rounded" >Save</button>}
                    </div>


                    {!isEditAccInfo ? ( 
                    <>
                    <div className="flex flex-col gap-3 pb-3">
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Email</span>
                        <span className="border-b-2">{email}</span>
                        </label> 
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Username</span>
                        <span className="border-b-2">{username}</span>
                        </label> 
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Password</span>
                        <span className="border-b-2">{password ? '*'.repeat(password.length) : '*'}</span>
                        </label>
                    </div>
                    </>
                    ):(
                    <>
                    {/* Edit Account Information*/}
                    <div className="flex flex-col gap-3 pb-3">
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Email</span>
                        <input onChange={handleEditEmail} name="email" className="rounded-sm w-full"/>
                        </label> 
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Username</span>
                        <input onChange={handleEditUsername} name="username" className="rounded-sm w-full"/>
                        </label> 
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Password</span>
                        <input onChange={handleEditPassword} name="password" className="rounded-sm w-full"/>
                        </label>
                    </div>
                    </>
                    )}

                </div>

                {/* Personal Information */}
                <div className="px-1">
                    <div className="flex flex-row pb-4 gap-2 pt-4">
                        <div className="text-md font-bold">Personal Information</div>
                        <button onClick={toggleEditPersonalInfo} className="bg-slate-800 text-white px-2 text-xs rounded">{isEditPersonalInfo ? 'Cancel' : 'Edit'}</button>
                        {isEditPersonalInfo && <button onClick={editPersonalInfo} className="bg-slate-800 text-white px-2 text-xs rounded" >Save</button>}
                    </div>

                    {!isEditPersonalInfo ? ( 
                    <>
                    <div className="flex flex-col gap-3">
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">First name</span>
                        <span className="border-b-2">{first_name}</span>
                        </label> 
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Middle name</span>
                        <span className="border-b-2">{middle_name === null ? '-' : middle_name === 'null' ? '-' : middle_name}</span>
                        </label> 
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Last name</span>
                        <span className="border-b-2">{last_name}</span>
                        </label>
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Contact number</span>
                        <span className="border-b-2">{contact_info}</span>
                        </label>
                    </div>
                    </>
                    ):(
                    <>
                    {/* Edit Personal Information */}
                    <div className="flex flex-col gap-3">
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">First name</span>
                        <input onChange={handleEditFirstName} name="firstname" className="rounded-sm w-full"/>
                        </label> 
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Middle name</span>
                        <input onChange={handleEditMiddleName} name="middlename" className="rounded-sm w-full"/>
                        </label> 
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Last name</span>
                        <input onChange={handleEditLastName} name="lastname" className="rounded-sm w-full"/>
                        </label>
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Contact number</span>
                        <input onChange={handleEditContactNo} name="contactnumber" className="rounded-sm w-full"/>
                        </label>
                    </div>
                    </>
                    )}
                </div>

            </div>
            <div className="flex flex-col gap-5 w-3/5">
                <div className="flex flex-col">
                    <div className="bg-gray-100 p-5 flex flex-row justify-between">
                        <div className="text-2xl font-bold">Address</div>
                        <button onClick={toggleAdd} className="text-sm w-32 font-bold px-2 pt-1 bg-gray-800 text-white rounded-md">{isAdd ? 'Cancel' : 'Add Address'}</button>
                    </div>

                    {/* ito yung form to add a new address */}
                    {isAdd && (
                        <form action={`/api/address/${accountId}`} method="POST" className="bg-gray-100 flex flex-row border-t-2 justify-evenly p-5 gap-5 text-sm">
                            <div className="flex flex-col">
                                <span for="name" className="flex justify-start font-bold">Name</span>
                                <input id="name" name="name" className="w-full  pl-1 rounded-md "></input>
                            </div>
                            <div className="flex flex-col">
                                <span for="barangay" className="flex justify-start font-bold">Barangay</span>
                                <input id="barangay" name="barangay" className="w-full  pl-1 rounded-md "></input>
                            </div>
                            <div className="flex flex-col">
                                <span for="street" className="flex justify-start font-bold">Street</span>
                                <input id="street" name="street" className="w-full  pl-1 rounded-md "></input>
                            </div>
                            <div className="flex flex-col">
                                <span for="province" className="flex justify-start font-bold">Province</span>
                                <input id="province" name="province" className="w-full  pl-1 rounded-md "></input>
                            </div>
                            <div className="flex flex-col">
                                <span for="city" className="flex justify-start font-bold">City</span>
                                <input id="city" name="city" className="w-full  pl-1 rounded-md "></input>
                            </div>
                            <div className="flex flex-col">
                                <span for="zipcode" className="flex justify-start font-bold">Zip-Code</span>
                                <input id="zipcode" name="zip_code" className="w-full  pl-1 rounded-md "></input>
                            </div>
                            <button className="w-24 text-white h-full bg-green-500 px-2 py-1 font-bold rounded-md ">Add</button>
                        </form>
                    )}
                    {/* hanggang dito */}
                </div>

                <div className="flex flex-col gap-5">

                    {/* address card from here, ito yung mag ulit ulit */}
                    {addresses.map((address) => (
                        <div className="flex flex-col gap-4 bg-gray-100 p-5">
                            <div className="flex justify-between">
                                <span className="text-md font-semibold">{address.name}</span>
                                {/* dito yung address id para ma delete, or ano pa need mo */}
                                <input type="text" value={""} hidden/>
                                <button type="submit" className="text-xs font-normal bg-slate-800 px-2 py-1 rounded-md text-white">Delete</button>
                            </div>
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b-2">
                                        <th className="text-sm font-semibold">Barangay</th>
                                        <th className="text-sm font-semibold">Street</th>
                                        <th className="text-sm font-semibold">Province</th>
                                        <th className="text-sm font-semibold">City</th>
                                        <th className="text-sm font-semibold">Zip Code</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="">
                                        {/* plug the valeus here */}
                                        <th className="text-sm font-medium w-1/5">{address.barangay}</th>
                                        <th className="text-sm font-medium w-1/5">{address.street}</th>
                                        <th className="text-sm font-medium w-1/5">{address.province}</th>
                                        <th className="text-sm font-medium w-1/5">{address.city}</th>
                                        <th className="text-sm font-medium w-1/5">{address.zip_code}</th>
                                        {/* till dito */}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                    {/* address card ends here */}

                </div>
            </div>
        </div>
    </div>
    );
}