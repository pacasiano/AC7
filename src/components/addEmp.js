import React, { useState, useEffect, useContext } from "react";
import { myContext } from "../context/adminContext";
import { passwordStrength } from 'check-password-strength'
import { set } from "react-hook-form";

export default function AddEmployee() {
    
    const { setPage } = useContext(myContext);

    // username and password values
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState();

    // Fetches all accounts (for checking if username is taken)
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/account')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                console.log(data);
            });
    }, []);

    // checks if username is taken
    const [usernameTaken, setUsernameTaken] = useState(false);
    function handleUsernameInput(event) {
        const enteredUsername = event.target.value;

        // Check if the entered username already exists
        const isUsernameTaken = users.some(user => user.username === enteredUsername);

        if (isUsernameTaken) {
            setUsernameTaken(true);
        } else {
            setUsernameTaken(false);
            console.log("Username available")
            setUsername(enteredUsername);
        }
    } 

    // Checks if password is strong enough
    const [passStrength, setPassStrength] = useState(null);
    function handlePasswordInput(event) {
        setPassStrength(passwordStrength(event.target.value).value)
        setPassword(event.target.value)
        console.log("Pass 1: " + passStrength)
    }

    // Sets password color to matching color of strength
    const getTextColor = (value) => {
        switch (value) {
        case 'Too weak':
            return 'text-red-500';
        case 'Weak':
            return 'text-orange-500';
        case 'Medium':
            return 'text-yellow-500';
        case 'Strong':
            return 'text-green-500';
        default:
            return '';
        }
    };

    const [invalidInput, setInvalidInput] = useState(false);
    // Checks if password matches, then submits form
    const handleSubmit = async (event) => {
        event.preventDefault();
    
       if(passStrength !== "Too weak" && usernameTaken === false) {
    
        try {

        // Send a POST request to the API endpoint (idk ano dapat dito)
        const response = await fetch("/api/product", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            // Include the body with the form data here if needed
            // body: JSON.stringify({ key: value }),
        });
    
        if (response.ok) {
            // Handle success
            console.log("Form submitted successfully!");
        } else {
            // Handle errors
            console.error("Form submission failed:", response.status);
        }
        } catch (error) {
        console.error("Error submitting form:", error);
        }

        }else {
            setInvalidInput(true)
            setTimeout(() => {
               setInvalidInput(false) 
            }, 1000);
            console.log("May error")
        }
    };


    return (
        <div className="px-8 py-8">
        <div className="flex flex-col gap-5">
            <div id="header" className="flex flex-row justify-between">
            <span className="text-xl font-bold">Add Employee Account</span>
            <button
                onClick={() => setPage("users")}
                className="bg-gray-200 px-2 py-1 rounded-md font-medium"
            >
                Back
            </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                {/* ACC INFO */}
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-400">
                        <th className="text-md font-bold border p-2 text-white w-1/5" >
                            Username
                            {usernameTaken && <> - <span className="text-red-500 animate-pulse">Already taken</span></>}
                        </th>
                        <th className="text-md font-bold border p-2 text-white w-1/5" >
                            Password
                            {passStrength !== null && <> - <span className={`${getTextColor(passStrength)} animate-pulse`}>{passStrength}</span></>}

                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-300">
                        <td className="text-sm font-semibold border p-2">
                            <input onChange={handleUsernameInput} name="username" className="w-full h-10 text-center"/>
                        </td>
                        <td className="text-sm font-semibold border p-2">
                            <input onChange={handlePasswordInput} name="password" type="password" className="w-full h-10 text-center"/>
                        </td>
                        </tr>
                    </tbody>
                </table>

                {/* EMPLOYEE INFO */}
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-400">
                        <th className="text-md font-bold border p-2 text-white w-1/5" >
                            First name
                        </th>
                        <th className="text-md font-bold border p-2 text-white w-1/5" >
                            Middle name
                        </th>
                        <th className="text-md font-bold border p-2 text-white w-1/5" >
                            Last name
                        </th>
                        <th className="text-md font-bold border p-2 text-white w-1/5" >
                            Position
                        </th>
                        <th className="text-md font-bold border p-2 text-white w-1/5" >
                            Contact info
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-300">
                        <td className="text-sm font-semibold border p-2">
                            <input name="first_name" className="w-full h-10 text-center" required />
                        </td>
                        <td className="text-sm font-semibold border p-2">
                            <input name="middle_name" type="text" className="w-full h-10 text-center" />
                        </td>
                        <td className="text-sm font-semibold border p-2">
                            <input name="last_name" type="text" className="w-full h-10 text-center" required/>
                        </td>
                        <td className="text-sm font-semibold border p-2">
                            <input name="position" type="text" className="w-full h-10 text-center" required/>
                        </td>
                        <td className="text-sm font-semibold border p-2">
                            <input name="contact_info" type="text" className="w-full h-10 text-center" required/>
                        </td>
                        </tr>
                    </tbody>
                </table>

                <div className={`${invalidInput === true ? "animate-wiggle" : ""} text-sm w-full flex justify-end font-semibold p-2`}>
                    <button className={` bg-green-600 p-3 w-44 rounded-xl text-white`}>SUBMIT</button>
                </div>
            </form>
            </div>
        </div>
    );
}