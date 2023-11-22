import React, { useState, useEffect } from "react";
import "../App.css";
import navlogo from "../imgs/navlogo.png";
import { Link } from "react-router-dom";

function Landing() {

  // should be true when password or username is incorrect
  const [incorrect, setIncorrect] = useState(false);

  const [username, setUsername] = useState('');
  function usernameHandler(event) {
    setUsername(event.target.value)
  }

  const [password, setPassword] = useState('');
  function passwordHandler(event) {
    setPassword(event.target.value)
  }

  function submitForm(e) {
    e.preventDefault();

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
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
                setIncorrect(true);
            } else if (data.message === "User not found") {
                // Handle user not found
                console.log("User not found");
                setIncorrect(true); // You can modify this based on your requirements
            } else {
                // Handle other cases
                console.log("Unknown error");
            }
        })
        .catch((error) => {
            console.error('Error during fetch:', error);
        });

    setTimeout(() => {
        setIncorrect(false);
    }, 4000);
}

  return (
    <section className="bg-gray-50 w-full h-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="/home"
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
            <div className="absolute translate-x-[75px] -translate-y-3">
            {incorrect && <div className="text-red-500 font-semibold text-center animate-bounce2">Invalid username or password!</div>}
            </div>
              <div className={`${incorrect && "pt-4"}`}>
                <label for="username" className="block mb-2 text-sm font-medium text-gray-900">Your username</label>
                <input
                  type="text"
                  onChange={usernameHandler}
                  id="username"
                  className={`bg-gray-50 border ${incorrect ? 'border-red-500' : 'border-gray-900'} sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5`}
                  placeholder="Enter username"
                  required=""
                />
              </div>
              <div className="">
                <label for="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input type="password" onChange={passwordHandler} id="password" placeholder="••••••••"
                  className={`bg-gray-50 border ${incorrect ? 'border-red-500' : 'border-gray-900'} sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5`}
                  required=""
                />
              </div>
              <button type="submit"
                className={` ${incorrect === true ? "animate-wiggle " : ""} w-full text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-50 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
              >
                Login to account
              </button>
              <p className="flex justify-center text-sm font-light text-gray-500">
                Don't have an account?{" "}
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
  );
}

export default Landing;
