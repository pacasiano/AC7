import React, { useState, useEffect } from 'react';
import "../App.css";
import ReactModal from "react-modal";
import {useForm} from "react-hook-form";
import Select from "react-select";

export default function Users() {

    const[account, setAccount]= useState("customer");
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const [selectedUser, setSelectedUser] = useState(null);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/customer')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
            });
    }, []);

    // Generate options based on products
    const options = [
        { value: 'All', label: 'All' },
        ...users.map((user) => ({
        value: user.account_id,
        label: user.first_name+" "+user.last_name,
        })),
    ];

    // Filter products based on the selected value
    // Filter users based on the selected value
    const filteredUsers = selectedUser
    ? selectedUser.value === 'All'
        ? users
        : users.filter((user) => user.account_id === selectedUser.value)
    : users;

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetch('/api/employee')
            .then((res) => res.json())
            .then((data) => {
                setEmployees(data);
            });
    }, []);

    return(
        <div className="h-screen px-8 pt-8">
            <div className="flex flex-col gap-5 ">
                <div id="header" className="flex flex-row justify-between">
                    <span className="text-xl font-bold">Accounts</span>
                    <Select options={options} className="w-96" onChange={(selectedOption) => setSelectedUser(selectedOption)} />
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
                            {/* <button><span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">View All</span></button> */}
                        </div>
                    </div>
                    {account==="customer" ? (
                    <div className="max-h-[560px] overflow-auto">
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-400">
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Account ID</th>
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">First Name</th>
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Last Name</th>
                                {/* <th className="text-sm font-semibold border p-2 text-white">Address</th> */}
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Contact</th>
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Email</th>
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Reputation</th>
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredUsers.map((user) => (
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
                    </div>
                    ) : (
                    <div className="max-h-[560px] overflow-auto">
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-400">
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Employee ID</th>
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">First Name</th>
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Last Name</th>
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Position</th>
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Emp_Status</th>
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Contact Info</th>
                                <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr className="bg-gray-300">
                                    <td className="text-sm font-semibold border p-2">{employee.employee_id}</td>
                                    <td className="text-sm font-semibold border p-2">{employee.first_name}</td>
                                    <td className="text-sm font-semibold border p-2">{employee.last_name}</td>
                                    <td className="text-sm font-semibold border p-2">{employee.position}</td>
                                    <td className="text-sm font-semibold border p-2">{employee.emp_status}</td>
                                    <td className="text-sm font-semibold border p-2">{employee.contact_info}</td>
                                    <td className="flex flex-row gap-2 text-sm font-semibold border p-2 ">
                                    <button className="bg-green-500 text-white px-4 py-2 w-full rounded">EDIT</button>
                                    </td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    </div>
                    )}
                </div>
            </div> 
        </div>
        
    );
};