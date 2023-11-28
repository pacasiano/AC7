import React, { useState, useEffect } from "react";
import "../App.css";
import navlogo from "../imgs/navlogo.png";
import { Link } from "react-router-dom";

function Landing() {

  const usernameCookie = document.cookie.split("; ").find((row) => row.startsWith("username="))?.split("=")[1];
  console.log(usernameCookie);

  const [isCustomerRegistered, SetIsCustomerRegistered] = useState(true);

  useEffect(() => {
      if (usernameCookie) {
          fetch(`/api/customer/username/${usernameCookie}`)
              .then((res) => {
                  if (!res.ok) {
                      throw new Error(`HTTP error! Status: ${res.status}`);
                  }
                  return res.json();
              })
              .then((response) => {
                  console.log('Fetched response:', response);
                  if (response === "wala") {
                    SetIsCustomerRegistered(false);
                  }else{
                    SetIsCustomerRegistered(true);
                  }
              })
              .catch((error) => {
                  console.error('Fetch error:', error);
                  // Handle the error here
              });
      } else {
          console.log('Username is undefined');
          // Handle the case where username is undefined
      }
  }, [usernameCookie]);

  if(!isCustomerRegistered) {
    window.location.href = "/AC7/sign-up/account-information";
  }

  // should be true when password or username is incorrect
  const [incorrectUsername, setIncorrectUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  // handles userinfo changes
  function handleChange(event) {
    setUserInfo({
      ...userInfo,
      [event.target.id]: event.target.value,
    });
  }

  function submitForm(e) {
    e.preventDefault();

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            username: userInfo.username,
            password: userInfo.password,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message === "Correct") {
                // Handle correct credentials
                window.location.href = "/AC7/";
                console.log("Login successful");
            } else if (data.message === "Incorrect") {
                // Handle incorrect credentials
                console.log("Incorrect credentials");
                setInvalidPassword(true);
                setTimeout(() => {
                  setInvalidPassword(false);
                }, 3000);
            } else if (data.message === "User not found") {
                // Handle user not found
                console.log("User not found");
                setIncorrectUsername(true);
                setTimeout(() => {
                  setIncorrectUsername(false);
                }, 3000);
            } else {
                // Handle other cases
                console.log("Unknown error");
            }
        })
        .catch((error) => {
            console.error('Error during fetch:', error);
        });
  }

  const [value, setValue] = useState({
    username: false,
    password: false,
  });

  useEffect(() => {
    const validateField = (field, value) => {
      setValue((prevValue) => ({
        ...prevValue,
        [field]: !!value, // Set to true if value exists, false otherwise
      }));
    };

    validateField("username", userInfo.username);
    validateField("password", userInfo.password);
  }, [userInfo]);

  return (
    <>
    <section className="bg-gray-50 w-full h-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="/AC7/"
          className="flex items-center mb-3 mr-4 text-2xl font-semibold text-gray-900 "
        >
          <img
            className="object-cover w-24 h-14"
            src={navlogo}
            alt="logo"
          />
          AC7 Dazzle White
        </a>
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-6 sm:p-8">
            <h1 className="flex justify-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Login to Account
            </h1>
            <form className="space-y-6" onSubmit={submitForm}>
              <div className={``}>
                <label for="username" className="block mb-2 text-sm font-medium text-gray-900">Your username</label>
                <input
                  type="text"
                  onChange={handleChange}
                  id="username"
                  className={`bg-gray-50 border ${(incorrectUsername && !value.name) ? 'border-red-500' : 'border-gray-900'} sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5`}
                  placeholder="Enter username"
                />
                {incorrectUsername && <span className="fixed text-red-500 text-xs">Invalid Username!</span>}
              </div>
              <div className="">
                <label for="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input type="password" onChange={handleChange} id="password" placeholder="••••••••"
                  className={`bg-gray-50 border ${((invalidPassword||incorrectUsername) && value.password) ? 'border-red-500' : 'border-gray-900'} sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5`}
                />
                {invalidPassword && <span className="fixed text-red-500 text-xs">Invalid Password!</span>}
              </div>
              <button type="submit"
                className={` ${incorrectUsername||invalidPassword === true ? "animate-wiggle " : ""} w-full text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-50 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
              >
                Login to account
              </button>
              <p className="flex justify-center text-sm font-light text-gray-500">
                Don't have an account? &nbsp;
                <Link
                  to="/sign-up"
                  className="font-medium text-blue-400 hover:underline"
                >
                  Sign-up here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default Landing;


