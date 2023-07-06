import React from "react";
import "../App.css";
import navlogo from "../imgs/navlogo.png";

function Landing() {
  return (
    <section className="bg-gray-50 w-full h-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/home"
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
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Login to Account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div className="pb-4">
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5"
                  required=""
                />
              </div>
              <button
                type="submit"
                className="w-full text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-50 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Login to account
              </button>
              <p className="text-sm font-light text-gray-500">
                Don't have an account?{" "}
                <a
                  href="/Sign-up"
                  className="font-medium text-blue-400 hover:underline"
                >
                  Sign-up here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Landing;
