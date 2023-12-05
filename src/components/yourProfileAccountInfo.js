import React, { useEffect, useState} from "react";
import { passwordStrength } from "check-password-strength";
import { set } from "date-fns";

export default function AccountInfo({accountId, email, username, password, setReloadData, setSuccessAccInfo, setError, errorUserNameTaken, setErrorUsernameTaken}) {

    //useStates, useEffects, and eventHandlers for editting account information
    const [usernameTaken, setUsernameTaken] = useState(false);
    const [passStrength, setPassStrength] = useState(null);
    const [incorrect, setIncorrect] = useState(false);
    const [users, setUsers] = useState([]);

    const [accountInfo, setAccountInfo] = useState({
        email: null,
        username: null,
        password: null
    });

    useEffect(() => {
        setAccountInfo({
            email: email,
            username: username,
            password: password
        })
    }, [email, username, password])


    useEffect(() => {
        fetch('/api/account')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                console.log(data);  
            });
    }, [accountInfo]);
    
    useEffect(() => {
    const timeoutId = setTimeout(() => {
        setIncorrect(false);
    }, 2000);
    return () => clearTimeout(timeoutId);
    }, [incorrect]); 
    
    const [isEditAccInfo, setEditAccInfo] = useState(false);
    const toggleEditAccInfo = () => {
        setEditAccInfo(!isEditAccInfo);
    }

    console.log(accountInfo)
    

    // handles changes in username
    function handleInputUsername(value) {
    // Check if the entered username already exists
    const isUsernameTaken = users.some(user => user.username === value);
    
    if (isUsernameTaken) {
        setUsernameTaken(true);
    } else {
        setUsernameTaken(false);
        setAccountInfo(prevInfo => ({ ...prevInfo, username: value }));
    }
    }
    
    // handles changes in password
    function handleInputPassword(value) {
    if (value.length !== 0) {
        const strength = passwordStrength(value).value;
        setPassStrength(strength);
        setAccountInfo(prevInfo => ({ ...prevInfo, password: value }));
        console.log("Pass 1: " + strength);
    } else {
        setPassStrength(null);
    }
    }
    
    // handles changes in other input fields
    function handleInputOther(value) {
    // Handle other input fields if needed
    setAccountInfo(prevInfo => {
        if (prevInfo.email !== value) {
        return { ...prevInfo, email: value };
        }
        return prevInfo;
    });
    }
    
    // handles changes in input fields
    function handleAccountInfo(event) {
    const { name, value } = event.target;
    
    if (name === 'username') {
        handleInputUsername(value);
    } else if (name === 'password') {
        handleInputPassword(value);
    } else {
        handleInputOther(value);
    }
    }

    // edit account info
    function editAccountInfo(e) {
        e.preventDefault();

        if(usernameTaken){
            setErrorUsernameTaken(true);
            setTimeout(() => {
                setErrorUsernameTaken(false);
            }, 3000);
            return;
        }

        console.log(accountInfo.email + " " + accountInfo.username + " " + accountInfo.password)
        console.log(email + " " + username + " " + password)

        if((accountInfo.email !== email || accountInfo.username !== username || (accountInfo.password !== password && passStrength !== "Too weak")) && !usernameTaken ) {
        fetch(`/api/account/${accountId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },  
            body: JSON.stringify({
                email: accountInfo.email,
                username: accountInfo.username,
                password: accountInfo.password
            })
        })
        .then(res => res.json())
        .then(data => { 
            console.log(data)
            setReloadData((prev) => !prev);
            setEditAccInfo(false);
            setSuccessAccInfo(true);
            setTimeout(() => {
                setSuccessAccInfo(false);
            }, 3000);
            
        })
        .catch(err => console.error(err))
    }else {
        setError(true);
        setEditAccInfo(false);
            setTimeout(() => {
                setError(false);
            }, 3000);
    }
    
    setReloadData((prev) => !prev);

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

    return (
    <div className="px-1">
        <div className="flex flex-row pb-4 gap-2">
            <div className="text-md font-bold">Account Information</div>
            <button onClick={toggleEditAccInfo} className="bg-slate-800 text-white px-2 text-xs rounded">{isEditAccInfo ? 'Cancel' : 'Edit'}</button>
            {isEditAccInfo && <button onClick={editAccountInfo} className={`${errorUserNameTaken && "animate-wiggle"} bg-slate-800 text-white px-2 text-xs rounded`} >Save</button>}
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
            <span className="border-b-2">{password ? '*'.repeat(25) : '*'}</span>
            </label>
        </div>
        </>
        ):(
        <>
        {/* Edit Account Information*/}
        <div className="flex flex-col gap-3 pb-3">
            <label className="flex flex-col max-w-sm">
            <span className="text-sm font-semibold">Email</span>
            <input placeholder={email} onChange={handleAccountInfo} name="email" className="rounded-sm w-full pl-1"/>
            </label> 
            <label className="flex flex-col max-w-sm">
            <span className="text-sm font-semibold">Username</span>
            <input placeholder={username} onChange={handleAccountInfo} name="username" className={`${(errorUserNameTaken || usernameTaken) && "border border-red-500"} rounded-sm w-full pl-1`}/>
            {usernameTaken && ( 
            <span className="fixed translate-y-10 pl-1 text-sm font-light text-red-500">
                Username is already taken
            </span>
            )}
            </label> 
            <label className="flex flex-col max-w-sm">
            <span className="text-sm font-semibold">Password</span>
            <input placeholder={password ? '*'.repeat(25) : '*'} onChange={handleAccountInfo} name="password" className="rounded-sm w-full pl-1"/>
            {passStrength !== null && <span className={`${getTextColor(passStrength)} translate-y-10 text-sm fixed animate-pulse`}>{passStrength}</span>}
            </label>
        </div>
        </>
        )}

    </div>
    );
}