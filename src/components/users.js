import React, { useState, useEffect, useContext } from 'react';
import "../App.css";
import Select from "react-select";
import { myContext } from "../context/adminContext";

export default function Users() {

    const[account, setAccount]= useState("customer");
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const { setPage } = useContext(myContext);

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

    const options2 = [
        { value: 'All', label: 'All' },
        ...employees.map((employee) => ({
        value: employee.employee_id,
        label: employee.first_name+" "+employee.last_name,
        })),
    ];

    // Filter users based on the selected value
    const filteredEmployees = selectedEmployee
    ? selectedEmployee.value === 'All'
        ? employees
        : employees.filter((employee) => employee.employee_id === selectedEmployee.value)
    : employees;


    return(
        <div className="h-screen px-8 pt-8">
            <div className="flex flex-col gap-5 ">
                <div id="header" className="flex flex-row justify-between">
                    <span className="text-xl font-bold">Accounts</span>
                    {account === "customer" ?
                    <Select options={options} className="w-96" onChange={(e) => setSelectedUser(e)} isSearchable={true} />
                    :
                    <Select options={options2} className="w-96" onChange={(e) => setSelectedEmployee(e)} isSearchable={true}/>
                    }   
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
                            ) : (<>
                            <button onClick={()=> setAccount("customer")}><span className="text-md bg-gray-100 px-2 py-1 rounded-md font-bold">View User Accounts</span></button>  
                            <button onClick={()=> setPage("addEmployee")}><span className=" text-md bg-gray-100 px-2 py-1 rounded-md font-bold">Add</span></button>
                            </>)}
                    
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
                                {/* <th className="sticky top-0 bg-gray-400 text-sm font-semibold border p-2 text-white">Actions</th> */}
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
                                        {/* <td className="flex flex-row gap-2 text-sm font-semibold border p-2 ">
                                        <button className="bg-green-500 text-white px-4 py-2 w-full rounded">EDIT</button>
                                         </td> */}
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
                            {filteredEmployees.map((employee) => (
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