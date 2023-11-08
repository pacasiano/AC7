import React from "react";
import "../App.css";
import navlogo from "../imgs/navlogo.png";
import { Link } from "react-router-dom";

function Landing() {

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 border-pink-700">
        <a href="/home" className="flex items-center mb-3 mr-4 text-2xl font-semibold text-gray-900 ">
                <img className="object-cover w-24 h-14" src={navlogo} alt="logo"/>AC7 Dazzle White
            </a>
        <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-5 w-2/3">
            {/* this the form for this */}
            <form className="space-y-4 w-full" action="#">
                <div className="flex flex-row justify-center gap-5 w-full pb-2">  
                    <section className="w-1/2">
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-full">
                                <div className="space-y-4 ">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 ">Account information</h1>
                                    {/* first name */}
                                    <div>
                                        <label for="firstName" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                                        <input type="text" name="firstName" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full h-9 p-2.5" placeholder="First Name" required=""/>
                                    </div>
                                    {/* Middle name */}
                                    <div>
                                        <label for="middleName" className="block mb-2 text-sm font-medium text-gray-900">Middle Name</label>
                                        <input type="text" name="middleName" id="midldeName" placeholder="Middle Name" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full h-9 p-2.5" required=""/>
                                    </div>
                                    {/* Last name */}
                                    <div>
                                        <label for="lastName" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                                        <input type="text" name="lastName" id="lastName" placeholder="Last Name" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full h-9 p-2.5" required=""/>
                                    </div>
                                    {/* contact information */}
                                    <div>
                                        <label for="contactInfo" className="block mb-2 text-sm font-medium text-gray-900">Contact Information</label>
                                        <input type="text" name="contactInfo" id="contactInfo" placeholder="Contact Information" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full h-9 p-2.5" required=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="w-full border-l-2 pl-4">
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-full">
                                <div className="space-y-4 ">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 ">Address</h1>
                                    <div className="flex flex-row gap-4">
                                        <div className="flex flex-col gap-4 w-1/2">
                                            {/* Address Name */}
                                            <div>
                                                <label for="addressName" className="block mb-2 text-sm font-medium text-gray-900">Address Name</label>
                                                <input type="text" name="addressName" id="addressName" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full h-9 p-2.5" placeholder="Address Name" required=""/>
                                            </div>
                                            {/* Street */}
                                            <div>
                                                <label for="street" className="block mb-2 text-sm font-medium text-gray-900">Street</label>
                                                <input type="text" name="street" id="street" placeholder="Street" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full h-9 p-2.5" required=""/>
                                            </div>
                                            {/* Barangay */}
                                            <div>
                                                <label for="barangay" className="block mb-2 text-sm font-medium text-gray-900">Barangay</label>
                                                <input type="text" name="barangay" id="barangay" placeholder="Barangay" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full h-9 p-2.5" required=""/>
                                            </div>
                                            {/* Province */}
                                            <div>
                                                <label for="province" className="block mb-2 text-sm font-medium text-gray-900">Province</label>
                                                <input type="text" name="province" id="province" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full h-9 p-2.5" placeholder="Province" required=""/>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4 w-1/2">
                                            
                                            {/* City */}
                                            <div>
                                                <label for="city" className="block mb-2 text-sm font-medium text-gray-900">City</label>
                                                <input type="text" name="city" id="city" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full h-9 p-2.5" placeholder="City" required=""/>
                                            </div>
                                            {/* Zip-code */}
                                            <div>
                                                <label for="zipCode" className="block mb-2 text-sm font-medium text-gray-900">Zip-code</label>
                                                <input type="text" name="zipCode" id="zipCode" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full h-9 p-2.5" placeholder="Zip Code" required=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <button type="submit" className="w-full text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-50 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-2.5 text-center">
                    Submit
                </button>
            </form>
        </div>
    </div>
    
  );
}

export default Landing;
