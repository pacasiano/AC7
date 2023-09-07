import React, { useState, useEffect } from 'react';
import "../App.css";
import ReactModal from "react-modal";
import {useForm} from "react-hook-form";

export default function Users() {

    const[account, setAccount]= useState("customer");
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/users')
            .then((res) => res.json())
            .then((users) => {
                setUsers(users);
            });
    }, []);

    return(
        <div className="h-screen px-8 pt-8">
            <div className="flex flex-col gap-5 ">
                <div id="header" className="flex flex-row justify-start">
                    <span className="text-xl font-bold">Accounts</span>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row justify-between bg-gray-200 w-full p-5">
                        <div>
                            {account==="customer" ? (
                                <span className="text-md font-bold">User List</span>
                                ) : (
                                <span className="text-md font-bold">Employee List</span>
                                )
                            }
                            
                        </div>
                        <div className="flex flex-row gap-2">
                            {account==="customer" ? (
                            <button onClick={()=> setAccount("employee")}><span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">View Emp Accounts</span></button>
                            ) : (
                            <button onClick={()=> setAccount("customer")}><span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">View User Accounts</span></button>  
                            )}
                            {account==="employee" && (
                            <button onClick={()=> setIsOpen(true)}><span className=" text-md bg-gray-100 px-2 py-1 rounded-md font-bold">Add</span></button>
                            )}
                            <ReactModal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} className={"ml-[45rem] my-[10rem] h-[32rem] w-[32rem]  bg-gray-200 flex flex-col align-items: center items-center"}>
                                <div className=" bg-gray-400 w-[32rem] mt-[2rem] pb-8 pt-8 text-xl font-bold text-center text-justified text-white">
                                    Enter Employee Details
                                </div>
                                <div className="flex flex-col space-y-2.5 mt-[2rem]">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                    {/* register your input into the hook by invoking the "register" function */}
                                    <div className="flex flex-row pb-4">
                                        <div className="w-24">
                                            First Name
                                        </div>
                                        <input defaultValue=" " {...register("example")} />
                                    </div>
                                    <div className="flex flex-row pb-4">
                                        <div className="w-24">
                                            Last Name
                                        </div>
                                        <input defaultValue="" {...register("example")} />
                                    </div>
                                    <div className="flex flex-row pb-4">
                                        <div className="w-24">
                                            Position
                                        </div>
                                        <input defaultValue="" {...register("example")} />
                                    </div>
                                    <div className="flex flex-row pb-4">
                                        <div className="w-24">
                                            Contact Info
                                        </div>
                                        <input defaultValue="" {...register("example")} />
                                    </div>
                                    
                                    <div className="ml-[6rem] bg-green-500 w-[4rem] text-center rounded-lg text-white">
                                        <input type="submit"/>
                                    </div>
                                    </form>
                                </div>
                            </ReactModal>  
                            <button><span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">View All</span></button>
                        </div>
                    </div>
                    {account==="customer" ? (
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-400">
                                <th className="text-sm font-semibold border p-2 text-white">Account ID</th>
                                <th className="text-sm font-semibold border p-2 text-white">First Name</th>
                                <th className="text-sm font-semibold border p-2 text-white">Last Name</th>
                                {/* <th className="text-sm font-semibold border p-2 text-white">Address</th> */}
                                <th className="text-sm font-semibold border p-2 text-white">Contact</th>
                                <th className="text-sm font-semibold border p-2 text-white">Email</th>
                                <th className="text-sm font-semibold border p-2 text-white">Reputation</th>
                                <th className="text-sm font-semibold border p-2 text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user) => (
                                    <tr className="bg-gray-300" key={user.account_id}>
                                        <td className="text-sm font-semibold border p-2">{user.account_id}</td>
                                        <td className="text-sm font-semibold border p-2">{user.first_name}</td>
                                        <td className="text-sm font-semibold border p-2">{user.last_name}</td>
                                        <td className="text-sm font-semibold border p-2">{user.contact_info}</td>
                                        <td className="text-sm font-semibold border p-2">{user.email}</td>
                                        <td className="text-sm font-semibold border p-2">{user.reputation}</td>
                                        <td className="flex flex-row gap-2 text-sm font-semibold border p-2 ">
                                        <button className="bg-green-500 text-white px-4 py-2 w-full rounded">EDIT</button>
                                         </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    ) : (
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-400">
                                <th className="text-sm font-semibold border p-2 text-white">Employee ID</th>
                                <th className="text-sm font-semibold border p-2 text-white">First Name</th>
                                <th className="text-sm font-semibold border p-2 text-white">Last Name</th>
                                <th className="text-sm font-semibold border p-2 text-white">Position</th>
                                <th className="text-sm font-semibold border p-2 text-white">Emp_Status</th>
                                <th className="text-sm font-semibold border p-2 text-white">Contact Info</th>
                                <th className="text-sm font-semibold border p-2 text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-300">
                                <td className="text-sm font-semibold border p-2">12341234</td>
                                <td className="text-sm font-semibold border p-2">Juan</td>
                                <td className="text-sm font-semibold border p-2">Dela Cruz</td>
                                <td className="text-sm font-semibold border p-2">Owner</td>
                                <td className="text-sm font-semibold border p-2">Active</td>
                                <td className="text-sm font-semibold border p-2">junjun@gmail.com</td>
                                <td className="flex flex-row gap-2 text-sm font-semibold border p-2 ">
                                <button className="bg-green-500 text-white px-4 py-2 w-full rounded">EDIT</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    ) }
                </div>
            </div> 
        </div>
        
    );
};