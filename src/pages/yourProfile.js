import React, { useState, useEffect } from "react";
import {
    Success,
    Error,
    SuccessAddressEdit,
    SuccessAddressAdd,
    FailAddressAdd,
    AddressDeleted,
    ErrorTaken,
  } from '../components/yourProfileModals';
import YourProfileAccountInfo from "../components/yourProfileAccountInfo";
import YourProfilePersonalInfo from "../components/yourProfilePersonalInfo";

export default function Settings() {

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
                    return id;
                }
            }
        }
        else {
            const id = cookie.slice(cookie.indexOf('=')+1);
            return id;
        }
    }

    const accountId = getAcctIdFromCookie(cookie);

    // RELOADS ALL DATA
    const [reloadAddData, setReloadAddData] = useState(false);
    const [reloadData, setReloadData] = useState(false);


    // Open close for add address form
    const [isAdd, setAdd] = useState(false);
    const toggleAdd = () => {
        setAdd(!isAdd);
    };

    // Account/Personal info succesfully edited
    const [isSuccessAccInfo, setSuccessAccInfo] = useState(false);

    // Succesful Address Delete
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    // Succesful Address Edit
    const [resultSuccess, setResultSuccess] = useState(false);
    // Succesful Address Add
    const [addSuccess, setAddSuccess] = useState(false);

    // Error modals 
    const [errorUserNameTaken, setErrorUsernameTaken] = useState(false);
    const [error, setError] = useState(false);
    const [addFail, setAddFail] = useState(false);

    // data's
    const [addresses, setAddresses] = useState([]);
    const [userData, setUserData] = useState({
        email: null,
        username: null,
        password: null,
        first_name: null,
        middle_name: null,
        last_name: null,
        contact_info: null
    });

    // address verification
    const [addressTaken, setAddressTaken] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/profile/${accountId}`);
                const userData = await response.json();
                setUserData(userData[0]);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
    
        fetchData();
    }, [accountId, reloadData]);
    

    // gets user addresses from db
    useEffect(() => {
        fetch(`/api/address/${accountId}`)
        .then((res) => res.json())
        .then((data) => {
            setAddresses(data);
        });
    }, [accountId, reloadAddData]);

    //useStates, useEffects, and eventHandlers for adding new address

    const [newAddress, setNewAddress] = useState({
        addressName: null,
        barangay: null,
        street: null,
        province: null,
        city: null,
        zipcode: null,
    });

    const [reloadNewAddress, setReloadNewAddress] = useState(false);
    useEffect(() => {
        //sets the newAddress obj back to null
        setNewAddress({
            addressName: null,
            barangay: null,
            street: null,
            province: null,
            city: null,
            zipcode: null,
        });
    }, [reloadNewAddress]);

    const handleAddressInfo = (e) => {
        if(e.target.id === "name"){
            // check if name is taken
            if(addresses.some((address) => address.name === e.target.value)){
                setAddressTaken(true);
            }else{
                setAddressTaken(false);
            }
        }
        setNewAddress({...newAddress, [e.target.id]: e.target.value});
    }

    // address
    function submitNewAddressForm(e) {
        e.preventDefault();



        // only works if all inputs are not null
        if((newAddress.name && newAddress.barangay && newAddress.street && newAddress.province && newAddress.city && newAddress.zipcode) && (newAddress.name.length > 3 && newAddress.barangay.length > 3 && newAddress.street.length > 3 && newAddress.province.length > 3 && newAddress.city.length > 3 && newAddress.zipcode.length === 4) && (!addressTaken)) {
        fetch(`/api/address/${accountId}`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: newAddress.name,
                barangay: newAddress.barangay,
                street: newAddress.street,
                province: newAddress.province,
                city: newAddress.city,
                zip_code: newAddress.zipcode
            })
        })
        .then((res) => res.json())
        .then((data) => {
            setReloadNewAddress((prev) => !prev)
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
        }else{
            setAddressTaken(false);
            setAddFail(true);
            setTimeout(() => {
                setAddFail(false);
            }, 3000);
        }
    }

    
 

  return(
    <>
    <Success isModalOpen={isSuccessAccInfo}/>
    <SuccessAddressEdit isModalOpen={resultSuccess}/>
    <SuccessAddressAdd isModalOpen={addSuccess}/>
    <FailAddressAdd isModalOpen={addFail}/>
    <AddressDeleted isModalOpen={deleteSuccess}/>
    <ErrorTaken isModalOpen={errorUserNameTaken}/>
    <Error isModalOpen={error}/>

    <div className="w-full min-h-screen py-16">
        <div className="pt-12 flex flex-row justify-center gap-5">
            <div className="bg-gray-100 w-1/4 px-5 pt-6 pb-10">
                <div className="text-2xl font-bold pb-4">Profile</div> 

                {/* Account Information */}
                <YourProfileAccountInfo reload={reloadData} accountId={accountId} email={userData.email} username={userData.username} password={userData.password} setReloadData={setReloadData} setSuccessAccInfo={setSuccessAccInfo} errorUserNameTaken={errorUserNameTaken} setError={setError}  setErrorUsernameTaken={setErrorUsernameTaken}  />
                
                {/* Personal Information */}
                <YourProfilePersonalInfo accountId={accountId} first_name={userData.first_name} middle_name={userData.middle_name} last_name={userData.last_name} contact_info={userData.contact_info} setReloadData={setReloadData} setSuccessAccInfo={setSuccessAccInfo} error={error} setError={setError} />
                
            </div>
            <div className="flex flex-col gap-5 w-3/5">
                <div className="flex flex-col">
                    <div className="bg-gray-100 p-5 flex flex-row justify-between">
                        <div className="text-2xl font-bold">Address</div>
                        <button onClick={toggleAdd} className="text-sm w-32 font-bold px-2 pt-1 bg-gray-800 text-white rounded-md">{isAdd ? 'Cancel' : 'Add Address'}</button>
                    </div>

                    {/* ito yung form to add a new address */}
                    {isAdd && (
                        <form onSubmit={submitNewAddressForm} className="bg-gray-100 flex flex-row border-t-2 justify-evenly p-5 gap-5 text-sm">
                            <div className="flex flex-col">
                                <span for="name" className="flex justify-start font-bold">Name</span>
                                <input id="name" onChange={handleAddressInfo} className={`${addFail ? "border-red-500 border" : "border"} w-full pl-1 rounded-md`} maxLength={25}></input>
                                {addressTaken && <span className="fixed text-xs translate-y-8 text-red-500">Name already taken</span>}
                            </div>
                            <div className="flex flex-col">
                                <span for="barangay" className="flex justify-start font-bold">Barangay</span>
                                <input id="barangay" onChange={handleAddressInfo} className={`${addFail ? "border-red-500 border" : "border"} w-full  pl-1 rounded-md`} maxLength={25}></input>
                            </div>
                            <div className="flex flex-col">
                                <span for="street" className="flex justify-start font-bold">Street</span>
                                <input id="street" onChange={handleAddressInfo} className={`${addFail ? "border-red-500 border" : "border"} w-full  pl-1 rounded-md`} maxLength={25}></input>
                            </div>
                            <div className="flex flex-col">
                                <span for="province" className="flex justify-start font-bold">Province</span>
                                <input id="province" onChange={handleAddressInfo} className={`${addFail ? "border-red-500 border" : "border"} w-full  pl-1 rounded-md`} maxLength={25}></input>
                            </div>
                            <div className="flex flex-col">
                                <span for="city" className="flex justify-start font-bold">City</span>
                                <input id="city" onChange={handleAddressInfo} className={`${addFail ? "border-red-500 border" : "border"} w-full  pl-1 rounded-md`} maxLength={25}></input>
                            </div>
                            <div className="flex flex-col">
                                <span for="zipcode" className="flex justify-start font-bold">Zip-Code</span>
                                <input id="zipcode" onChange={handleAddressInfo} className={`${addFail ? "border-red-500 border" : "border"} w-full  pl-1 rounded-md`}></input>
                            </div>
                            <button className={`${addFail && "animate-wiggle"} w-24 text-white h-full bg-green-500 px-2 py-1 font-bold rounded-md `}>Add</button>
                        </form>
                    )}
                    {/* hanggang dito */}
                </div>

                <div className="flex flex-col gap-5">
                    {addresses.map((address) => (
                        <AddressCard key={address.address_id} addresses={addresses} address={address} setReloadAddData={setReloadAddData} setAddSuccess={setAddSuccess} setDeleteSuccess={setDeleteSuccess} setResultSuccess={setResultSuccess} setError={setError}/>
                    ))}
                </div>
            </div>
        </div>
    </div>
    </>
    );
}

function AddressCard({ addresses, address, setReloadAddData, setAddSuccess, setDeleteSuccess, setResultSuccess, setError }) {

    function deleteAddress(address_id) {
        fetch(`/api/address/${address_id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            setReloadAddData((prev) => !prev);
            setAddSuccess(false);
            setDeleteSuccess(true);
            setTimeout(() => {
                setDeleteSuccess(false);
            }, 3000);
        })
    }

    const [edit, setEdit] = useState(false);

    // ito yung updated detailz
    const [updatedAddress, setUpdatedAddress] = useState(address);
    const [addressTaken, setAddressTaken] = useState(false);

    function handleEditAddress(event) {
        if(event.target.name === "name"){
            // check if name is taken
            if(addresses.some((address) => address.name === event.target.value)){
                setAddressTaken(true);
            }else{
                setAddressTaken(false);
            }
        }
        setUpdatedAddress({...updatedAddress, [event.target.name]: event.target.value});
    }

    function submitEditAddressForm(e) {
        e.preventDefault();

        if (!deepEqual(updatedAddress, address)&&(updatedAddress.zip_code.length === 4)&&(!addressTaken)) {

            fetch(`/api/address/${address.address_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    name: updatedAddress.name,
                    barangay: updatedAddress.barangay,
                    street: updatedAddress.street,
                    province: updatedAddress.province,
                    city: updatedAddress.city,
                    zip_code: updatedAddress.zip_code
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data.message)
            })

            setReloadAddData((prev) => !prev);
            console.log("success");
            setDeleteSuccess(false);
            setResultSuccess(true);
            setEdit(false);
            setTimeout(() => {
                setResultSuccess(false);
            }, 3000);
        } else {
            setAddressTaken(false);
            console.log("no changes");
            setResultSuccess(false);
            setEdit(false);
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 3000);
            
        }
    }

    return(
    <>
    <div className="flex flex-col gap-4 bg-gray-100 p-5">
        <form onSubmit={submitEditAddressForm} >
            <div className="flex justify-between pb-3">
                
                <div className="flex flex-row gap-5">
                {!edit ? (
                <span className="text-md font-semibold">{address.name}</span>
                ) : (
                <input name="name" onChange={handleEditAddress} placeholder={address.name} className="bg-transparent border rounded-md"/>
                )}
                {addressTaken && <span className="fixed text-xs translate-y-7 text-red-500">Name already taken</span>}
                </div>

                <div className="flex flex-row gap-2">
                <button type="button" onClick={() => {setEdit(!edit)}} className="text-xs font-normal bg-slate-800 px-2 py-1 rounded-md text-white">{edit ? 'Cancel' : 'Edit'}</button>
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
    </>
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

