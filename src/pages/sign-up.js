import React, {useState, useEffect} from "react";
import "../App.css";
import navlogo from "../imgs/navlogo.png";
import { Link } from "react-router-dom";
import { passwordStrength } from 'check-password-strength'
import { set } from "react-hook-form";

function Landing() {
  
  //also need to verify that password = confirmPassword

  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/account')
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                console.log(data);
            });
    }, []);

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

  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();

  const [passStrength, setPassStrength] = useState();
  function handlePasswordInput(event) {
    setPassStrength(passwordStrength(event.target.value).value)
    setPassword(event.target.value)
    console.log("Pass 1: " + passStrength)
  }

  function handlePasswordInput2(event) {
    setPassword2(event.target.value)
    console.log("pass 2 updated")
  }

  const accData = {
    username: username,
    password: password
  }

  const [submitError, setSubmitError] = useState(false);

  function submitForm(e) {
    e.preventDefault();

    if(passStrength !== "Too weak" && match === null && usernameTaken === false) {

    let now = new Date();
    now.setTime(now.getTime() + 1 * 3600 * 1000);
    document.cookie = `username=${username}; expires=" + now.toUTCString() + "; path=/`;

    fetch('/api/account', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(accData)
    })
    
    .then(res => res.json())
    .then(data => {
      console.log('Sign up data: ' + data)
      window.location.href = '/AC7/sign-up/account-information';
    })
    .catch((err) => {
      console.error("Error: ", err)
    })

    }else {
      console.log("May error")
      setSubmitError(true)

      setTimeout(() => {
        setSubmitError(false)
        console.log("false na")
    }, 1000);
    }

  }

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

  // Checks if passwords match
  const [match, setMatch] = useState(null);
  useEffect(() => {

      if (password === password2) {
        console.log("Passwords match")
        setMatch(null)
      } else {   
        setMatch("Passwords do not match")
      };

  }, [password, password2]);
  

  return (
    <section className="bg-gray-50 w-full h-full  ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="/home" className="flex items-center mb-3 mr-4 text-2xl font-semibold text-gray-900 ">
          <img className="object-cover w-24 h-14" src={navlogo} alt="logo"/>
          AC7 Dazzle White
        </a>
        <div className={` w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 `}>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">Create an Account</h1>
            <form onSubmit={submitForm} className="space-y-4 md:space-y-6">

              {/* Username */}
              <div>
                <div className="flex flex-row gap-2">
                <label for="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                {usernameTaken && ( 
                  <span className="text-sm font-medium text-red-500 animate-bounce2">
                    Username is already taken
                  </span>
                )}
                </div>
                <input onChange={handleUsernameInput} type="username" name="username" id="username"
                  className={` ${usernameTaken && 'border-red-500 ' } bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5`}
                  placeholder="Your username" required/>
              </div>
              
              {/* First Password */}
              <div>
                <div className="flex flex-row justify-start gap-2">
                <label for="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                {passStrength !== null && (
                    <span className={`text-sm font-medium ${passStrength === "Too weak" ? "animate-bounce2" : ""} ${getTextColor(passStrength)}`}>
                      {passStrength}
                    </span>
                )}
                </div>
                <input onChange={handlePasswordInput} type="password" name="password" id="password" placeholder="••••••••"
                  className={` ${passStrength === "Too weak" ? 'border-red-500' : ''} border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5`}
                  required/>
              </div>

              {/* Second Password */}
              <div>
                <div className="flex flex-row justify-start gap-2">
                <label for="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Confirm password
                </label>
                {password2 !== null && (
                    <span className={`text-sm font-medium text-red-500  ${match === "Passwords do not match" ? "animate-bounce2" : ""}`}>
                      {match}
                    </span>
                )}
                </div>
                <input onChange={handlePasswordInput2} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••"
                  className={` ${match === "Passwords do not match" ? 'border-red-500' : ''} bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5`}
                  required/>
              </div>

              {/* Terms and conditions */}
              <div className="flex justify-center items-start">
                <div className="flex items-center h-5">
                  <input id="terms" aria-describedby="terms" type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    required/>
                </div>
                <div className=" ml-3 text-sm">
                  <label for="terms" className="font-light text-gray-500">I accept the{" "}
                    <a className="font-medium text-blue-400 hover:underline" href="Home">Terms and Conditions</a>
                  </label>
                </div>
              </div>
              
              {/* Submit */}
              <button type="submit" className={`${submitError === true ? "animate-wiggle" : ""} w-full  text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-50 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
                Create an account
              </button>
              {/* ${submitError === true ? "animate-bounce2 bg-red-500 hover:bg-red-500" : ""} */}

              {/* Already have an account */}
              <p className="flex justify-center text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-blue-400 hover:underline">Login here</Link>
              </p>


            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
