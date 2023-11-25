import React, { useState, useEffect } from "react";

export default function Settings() {

    const [isAdd, setAdd] = useState(false);

    const toggleAdd = () => {
        setAdd(!isAdd);
    };

    const [isEditAccInfo, setEditAccInfo] = useState(false);
    const [isSuccessAccInfo, setSuccessAccInfo] = useState(false);

    setTimeout(() => {
        setSuccessAccInfo(false);
      }, 5000);

    const toggleEditAccInfo = () => {
        setEditAccInfo(!isEditAccInfo);
    }
    const [isEditPersonalInfo, setEditPersonalInfo] = useState(false);
    const [isSuccessPersonalInfo, setSuccessPersonalInfo] = useState(false);

    setTimeout(() => {
        setSuccessPersonalInfo(false);
    }, 5000);

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
    const [reloadData, setReloadData] = useState(false);

    useEffect(() => {
        fetch(`/api/profile/${accountId}`)
        .then((res) => res.json())
        .then((userData) => {
            setUserData(userData);
            console.log(userData);
        });
    }, [accountId, reloadData]);

    //the userData[0] || {} syntax ensures that we only destructure once userData contains some data returned by fetch
    //if it is still undefined (fetch has not returned anything), it will default to an empty object - this prevents errors related to undefined values
    const {email, username, password, first_name, middle_name, last_name, contact_info} = userData[0] || {};

    const [addresses, setAddresses] = useState([]);
    const [addSuccess, setAddSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [reloadAddData, setReloadAddData] = useState(false);

    useEffect(() => {
        fetch(`/api/address/${accountId}`)
        .then((res) => res.json())
        .then((address) => {
            setAddresses(address);
            
        });
    }, [accountId, reloadAddData]);

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

    function editAccountInfo(e) {
        e.preventDefault();


        if(edit_email !== email || edit_username !== username || edit_password !== password) {
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
            setEditAccInfo(false);
            setSuccessAccInfo(true);
            console.log(data)
            setReloadData((prev) => !prev);
        })
        .catch(err => console.error(err))
    }else {
        setEditAccInfo(false);
    }

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

    function editPersonalInfo(e) {
        e.preventDefault();

        if(edit_first_name !== first_name || edit_last_name !== last_name || edit_middle_name !== middle_name || edit_contactNo !== contact_info) {
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
            setEditPersonalInfo(false);
            setSuccessPersonalInfo(true);
            setReloadData((prev) => !prev);
        })
        .catch(err => console.error(err))
        }else {
            setEditPersonalInfo(false);
        }
    }


    const [newAddressName, setNewAddressName] = useState('')
    function newAddressNameHandler(event) {
        setNewAddressName(event.target.value)
    }

    const [newAddressBarangay, setNewAddressBarangay] = useState('')
    function newAddressBarangayHandler(event) {
        setNewAddressBarangay(event.target.value)
    }

    const [newAddressStreet, setNewAddressStreet] = useState('')
    function newAddressStreetHandler(event) {
        setNewAddressStreet(event.target.value)
    }

    const [newAddressProvince, setNewAddressProvince] = useState('')
    function newAddressProvinceHandler(event) {
        setNewAddressProvince(event.target.value)
    }

    const [newAddressCity, setNewAddressCity] = useState('')
    function newAddressCityHandler(event) {
        setNewAddressCity(event.target.value)
    }

    const [newAddressZipCode, setNewAddressZipCode] = useState('')
    function newAddressZipCodeHandler(event) {
        setNewAddressZipCode(event.target.value)
    }

    function submitNewAddressForm(e) {
        e.preventDefault();

        fetch(`/api/address/${accountId}`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: newAddressName,
                barangay: newAddressBarangay,
                street: newAddressStreet,
                province: newAddressProvince,
                city: newAddressCity,
                zip_code: newAddressZipCode
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setReloadAddData((prev) => !prev);
            setAdd(false);
            setDeleteSuccess(false);
            setAddSuccess(true);
            setTimeout(() => {
                setAddSuccess(false);
            }, 3000);
        })
        .catch((error) => {
            console.error('Error adding new address:', error);
        }); 
    }

    // should be true when password or username is incorrect
  const [incorrect, setIncorrect] = useState(false);
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIncorrect(false);
    }, 2000);

    // Clear the timeout if component unmounts or if incorrect becomes false before the timeout
    return () => clearTimeout(timeoutId);
  }, [incorrect]);

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

                    {isSuccessAccInfo && <div className="pb-3 font-black text-green-600">
                        Information successfully updated!
                    </div>}

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
                        <input placeholder={email} onChange={handleEditEmail} name="email" className="rounded-sm w-full pl-1"/>
                        </label> 
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Username</span>
                        <input placeholder={username} onChange={handleEditUsername} name="username" className="rounded-sm w-full pl-1"/>
                        </label> 
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Password</span>
                        <input placeholder={password} onChange={handleEditPassword} name="password" className="rounded-sm w-full pl-1"/>
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

                    {isSuccessPersonalInfo && <div className="pb-3 font-black text-green-600">
                        Information successfully updated!
                    </div>}

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
                        <input placeholder={first_name} onChange={handleEditFirstName} name="firstname" className="rounded-sm w-full pl-1"/>
                        </label> 
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Middle name</span>
                        <input placeholder={middle_name} onChange={handleEditMiddleName} name="middlename" className="rounded-sm w-full pl-1"/>
                        </label> 
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Last name</span>
                        <input placeholder={last_name} onChange={handleEditLastName} name="lastname" className="rounded-sm w-full pl-1"/>
                        </label>
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Contact number</span>
                        <input placeholder={contact_info} onChange={handleEditContactNo} name="contactnumber" className="rounded-sm w-full pl-1"/>
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
                        {addSuccess && <div className="text-xl pt-1 font-bold text-green-600">Address Successfully Added!</div>}
                        {deleteSuccess && <div className="text-xl pt-1 font-bold text-green-600">Address Successfully Deleted!</div>}
                        <button onClick={toggleAdd} className="text-sm w-32 font-bold px-2 pt-1 bg-gray-800 text-white rounded-md">{isAdd ? 'Cancel' : 'Add Address'}</button>
                    </div>

                    {/* ito yung form to add a new address */}
                    {isAdd && (
                        <form onSubmit={submitNewAddressForm} className="bg-gray-100 flex flex-row border-t-2 justify-evenly p-5 gap-5 text-sm">
                            <div className="flex flex-col">
                                <span for="name" className="flex justify-start font-bold">Name</span>
                                <input id="name" onChange={newAddressNameHandler} className="w-full  pl-1 rounded-md " maxLength={25}></input>
                            </div>
                            <div className="flex flex-col">
                                <span for="barangay" className="flex justify-start font-bold">Barangay</span>
                                <input id="barangay" onChange={newAddressBarangayHandler} className="w-full  pl-1 rounded-md " maxLength={25}></input>
                            </div>
                            <div className="flex flex-col">
                                <span for="street" className="flex justify-start font-bold">Street</span>
                                <input id="street" onChange={newAddressStreetHandler} className="w-full  pl-1 rounded-md " maxLength={25}></input>
                            </div>
                            <div className="flex flex-col">
                                <span for="province" className="flex justify-start font-bold">Province</span>
                                <input id="province" onChange={newAddressProvinceHandler} className="w-full  pl-1 rounded-md " maxLength={25}></input>
                            </div>
                            <div className="flex flex-col">
                                <span for="city" className="flex justify-start font-bold">City</span>
                                <input id="city" onChange={newAddressCityHandler} className="w-full  pl-1 rounded-md " maxLength={25}></input>
                            </div>
                            <div className="flex flex-col">
                                <span for="zipcode" className="flex justify-start font-bold">Zip-Code</span>
                                <input id="zipcode" onChange={newAddressZipCodeHandler} className="w-full  pl-1 rounded-md "></input>
                            </div>
                            <button className={`${incorrect && "animate-wiggle"} w-24 text-white h-full bg-green-500 px-2 py-1 font-bold rounded-md `}>Add</button>
                        </form>
                    )}
                    {/* hanggang dito */}
                </div>

                <div className="flex flex-col gap-5">
                    {addresses.map((address) => (
                        <AddressCard addresses={addresses} address={address} setReloadAddData={setReloadAddData} setAddSuccess={setAddSuccess} setDeleteSuccess={setDeleteSuccess}/>
                    ))}
                </div>
            </div>
        </div>
    </div>
    );
}

function AddressCard({ addresses, address, setReloadAddData, setAddSuccess, setDeleteSuccess }) {

    function deleteAddress(address_id) {
        fetch(`/api/address/${address_id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setReloadAddData((prev) => !prev);
            setAddSuccess(false);
            setDeleteSuccess(true);
            setTimeout(() => {
                setDeleteSuccess(false);
            }, 3000);
        })
    }



    const [edit, setEdit] = useState(false);
    const [resultSuccess, setResultSuccess] = useState(false);
    const [resultFail, setResultFail] = useState(false);

    // ito yung updated detailz
    const [updatedAddress, setUpdatedAddress] = useState(address);

    function handleEditAddress(event) {
        setUpdatedAddress({...updatedAddress, [event.target.name]: event.target.value});
    }

    function submitEditAddressForm(e) {
        e.preventDefault();

        if (!deepEqual(updatedAddress, address)) {

            // Dito yung form submit req something

            setReloadAddData((prev) => !prev);
            console.log("success");
            setDeleteSuccess(false);
            setResultSuccess(true);
            setEdit(false);
            setTimeout(() => {
                setResultSuccess(false);
            }, 1000);
        } else {
            console.log("no changes");
            setResultSuccess(false);
            setResultFail(true);
            setEdit(false);
            setTimeout(() => {
                setResultFail(false);
            }, 1000);
        }
    }

    return(
    <div className="flex flex-col gap-4 bg-gray-100 p-5">
        <form onSubmit={submitEditAddressForm} >
            <div className="flex justify-between pb-3">
                
                <div className="flex flex-row gap-5">
                {!edit ? (
                <span className="text-md font-semibold">{address.name}</span>
                ) : (
                <input name="name" onChange={handleEditAddress} placeholder={address.name} className="bg-transparent border rounded-md"/>
                )}
                {resultSuccess && <div className="text-md font-bold text-green-600">Address Successfully Updated!</div>}
                {resultFail && <div className="text-md font-bold text-red-600">There are no changes!</div>}
                </div>

                <div className="flex flex-row gap-2">
                <button type="button" onClick={() => {setEdit(!edit); console.log(edit)}} className="text-xs font-normal bg-slate-800 px-2 py-1 rounded-md text-white">{edit ? 'Cancel' : 'Edit'}</button>
                {(!edit && addresses.length > 1) &&
                <button onClick={() => deleteAddress(address.address_id)} className="text-xs font-normal bg-slate-800 px-2 py-1 rounded-md text-white">Delete</button>
                }
                {edit && <button type="submit" className="text-xs font-normal bg-green-500 px-2 py-1 rounded-md text-white">Save</button>}
                </div>

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
                        {edit ? (
                        <>
                            {/* dito makuha yung edited info */}
                            <th className="text-sm font-medium w-1/5"><input name="barangay" onChange={handleEditAddress} placeholder={address.barangay} className="bg-transparent text-center border rounded-md"/></th>
                            <th className="text-sm font-medium w-1/5"><input name="street" onChange={handleEditAddress} placeholder={address.street} className="bg-transparent text-center border rounded-md"/></th>
                            <th className="text-sm font-medium w-1/5"><input name="province" onChange={handleEditAddress} placeholder={address.province} className="bg-transparent text-center border rounded-md"/></th>
                            <th className="text-sm font-medium w-1/5"><input name="city" onChange={handleEditAddress} placeholder={address.city} className="bg-transparent text-center border rounded-md"/></th>
                            <th className="text-sm font-medium w-1/5"><input name="zip_code" onChange={handleEditAddress} placeholder={address.zip_code} className="bg-transparent text-center border rounded-md"/></th>
                        </>
                        ) : (
                        <>
                            <th className="text-sm font-medium w-1/5">{address.barangay}</th>
                            <th className="text-sm font-medium w-1/5">{address.street}</th>
                            <th className="text-sm font-medium w-1/5">{address.province}</th>
                            <th className="text-sm font-medium w-1/5">{address.city}</th>
                            <th className="text-sm font-medium w-1/5">{address.zip_code}</th>
                        </>
                        )}
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
    );
}

function deepEqual(obj1, obj2) {
    if (obj1 === obj2) {
      return true;
    }
  
    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
      return false;
    }
  
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (const key of keys1) {
      if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }
  
    return true;
  }
  