import React, { useState } from "react";

export default function Settings() {

    const [isAdd, setAdd] = useState(false);

    const toggleAdd = () => {
        setAdd(!isAdd);
    };

    const [isEdit, setEdit] = useState(false);

    const toggleEdit = () => {
        setEdit(!isEdit);
    }

  return(
    <div className="w-full h-screen pt-16">
        <div className="pt-12 flex flex-row justify-center gap-5">
            <div className="bg-gray-100 w-1/4 px-5 pt-6 pb-10">
                <div className="text-2xl font-bold pb-4">Settings</div>

                {/* form from here */}
                <div className="px-1">
                    <div className="flex flex-row pb-4 gap-2">
                        <div className="text-md font-bold">Account Information</div>
                        <button onClick={toggleEdit} className="bg-slate-800 text-white px-2 text-xs rounded">{isEdit ? 'Cancel' : 'Edit'}</button>
                        {isEdit && <button className="bg-slate-800 text-white px-2 text-xs rounded" >Save</button>}
                    </div>


                    {!isEdit ? ( 
                    <>
                    <div className="flex flex-col gap-3 pb-3">
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Email</span>
                        <span className="border-b-2">retep@gmail.com</span>
                        </label> 
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Username</span>
                        <span className="border-b-2">Peter_Pan</span>
                        </label> 
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Password</span>
                        <span className="border-b-2">*******</span>
                        </label>
                    </div>
                    <div className="text-md font-bold py-4">Personal Information</div>
                    <div className="flex flex-col gap-3">
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">First name</span>
                        <span className="border-b-2">Peter</span>
                        </label> 
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Middle name</span>
                        <span className="border-b-2">n/a</span>
                        </label> 
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Last name</span>
                        <span className="border-b-2">Casiano</span>
                        </label>
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">contact number</span>
                        <span className="border-b-2">09672009871</span>
                        </label>
                    </div>
                    </>
                    ):(
                    <>
                    {/* dito yung input form na part */}
                    <div className="flex flex-col gap-3 pb-3">
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Email</span>
                        <input name="email" className="rounded-sm w-full"/>
                        </label> 
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Username</span>
                        <input name="username" className="rounded-sm w-full"/>
                        </label> 
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Password</span>
                        <input name="password" className="rounded-sm w-full"/>
                        </label>
                    </div>
                    <div className="text-md font-bold py-4">Personal Information</div>
                    <div className="flex flex-col gap-3">
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">First name</span>
                        <input name="firstname" className="rounded-sm w-full"/>
                        </label> 
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Middle name</span>
                        <input name="middlename" className="rounded-sm w-full"/>
                        </label> 
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">Last name</span>
                        <input name="lastname" className="rounded-sm w-full"/>
                        </label>
                        <label className="flex flex-col max-w-sm">
                        <span className="text-sm font-semibold">contact number</span>
                        <input name="contactnumber" className="rounded-sm w-full"/>
                        </label>
                    </div>
                    </>
                    )}

                </div>
                {/* to here */}

            </div>
            <div className="flex flex-col gap-5 w-3/5">
                <div className="flex flex-col">
                    <div className="bg-gray-100 p-5 flex flex-row justify-between">
                        <div className="text-2xl font-bold">Address</div>
                        <button onClick={toggleAdd} className="text-sm w-32 font-bold px-2 pt-1 bg-gray-800 text-white rounded-md">{isAdd ? 'Cancel' : 'Add Address'}</button>
                    </div>

                    {/* ito yung form to add a new address */}
                    {isAdd && (
                        <div className="bg-gray-100 flex flex-row border-t-2 justify-evenly p-5 gap-5 text-sm">

                            <div className="flex flex-col">
                                <span for="name" className="flex justify-start font-bold">Name</span>
                                <input id="name" className="w-full  pl-1 rounded-md "></input>
                            </div>
                            <div className="flex flex-col">
                                <span for="barangay" className="flex justify-start font-bold">Barangay</span>
                                <input id="barangay" className="w-full  pl-1 rounded-md "></input>
                            </div>
                            <div className="flex flex-col">
                                <span for="street" className="flex justify-start font-bold">Street</span>
                                <input id="street" className="w-full  pl-1 rounded-md "></input>
                            </div>
                            <div className="flex flex-col">
                                <span for="province" className="flex justify-start font-bold">Province</span>
                                <input id="province" className="w-full  pl-1 rounded-md "></input>
                            </div>
                            <div className="flex flex-col">
                                <span for="city" className="flex justify-start font-bold">City</span>
                                <input id="city" className="w-full  pl-1 rounded-md "></input>
                            </div>
                            <div className="flex flex-col">
                                <span for="zipcode" className="flex justify-start font-bold">Zip-Code</span>
                                <input id="zipcode" className="w-full  pl-1 rounded-md "></input>
                            </div>
                            <button type="submit" className="w-24 text-white h-full bg-green-500 px-2 py-1 font-bold rounded-md ">Add</button>
                        </div>
                    )}
                    {/* hanggang dito */}
                </div>

                <div className="flex flex-col gap-5">

                    {/* address card from here, ito yung mag ulit ulit */}
                    <div className="flex flex-col gap-4 bg-gray-100 p-5">
                        <div className="flex justify-between">
                            <span className="text-md font-semibold">Name</span>
                            {/* dito yung address id para ma delete, or ano pa need mo */}
                            <input type="text" value={""} hidden/>
                            <button type="submit" className="text-xs font-normal bg-slate-800 px-2 py-1 rounded-md text-white">Delete</button>
                        </div>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b-2">
                                    <th className="text-sm font-semibold">Baranggay</th>
                                    <th className="text-sm font-semibold">Street</th>
                                    <th className="text-sm font-semibold">Province</th>
                                    <th className="text-sm font-semibold">City</th>
                                    <th className="text-sm font-semibold">Zip Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="">
                                    {/* plug the valeus here */}
                                    <th className="text-sm font-medium">Communal</th>
                                    <th className="text-sm font-medium">Emerald</th>
                                    <th className="text-sm font-medium">Davao Del Sur</th>
                                    <th className="text-sm font-medium">Davao</th>
                                    <th className="text-sm font-medium">8000</th>
                                    {/* till dito */}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* address card ends here */}

                </div>
            </div>
        </div>
    </div>
    );
}