import React, { useState } from "react";
import "../App.css";
import navlogo from "../imgs/navlogo.png";

function Landing() {
    
    const [buttonError, setButtonError] = useState(false);
    const [accountInformation, setAccountInformation] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        contact_info: "",
        address_name: "",
        street: "",
        barangay: "",
        province: "",
        city: "",
        zip_code: ""
    });

    function handleAccountInformation(event) {
        setAccountInformation({...accountInformation, [event.target.name]: event.target.value});
    }

    function handleSubmit(event) {
    event.preventDefault();

    // Check if all fields are inputted
    const isFormValid = Object.values(accountInformation).every((field) => Boolean(field));

    if (isFormValid) {

        fetch(`/api/customer`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                first_name: event.target.first_name.value,
                middle_name: event.target.middle_name.value,
                last_name: event.target.last_name.value,
                email: event.target.email.value,
                contact_info: event.target.contact_info.value,
                address_name: event.target.address_name.value,
                street: event.target.street.value,
                barangay: event.target.barangay.value,
                province: event.target.province.value,
                city: event.target.city.value,
                zip_code: event.target.zip_code.value
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.message)
        })
        .catch(err => {
            console.log(err)
        })

    }else{
        // Set buttonError to true for a 5 seconds
      setButtonError(true);
      setTimeout(() => {
        setButtonError(false);
      }, 5000);
    }

  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 border-pink-700">
        <a href="/home" className="flex items-center mb-3 mr-4 text-2xl font-semibold text-gray-900 ">
                <img className="object-cover w-24 h-14" src={navlogo} alt="logo"/>AC7 Dazzle White
            </a>
            {buttonError && <div className="text-red-500 text-xl font-bold text-center animate-bounce2 pb-2 transition-all">Please fill out all fields!</div>}
        <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-5 w-2/3">
            {/* this the form for this */}
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
                <div className="flex flex-row justify-center gap-5 w-full pb-2">  
                    <section className="w-1/2">
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-full">
                                <div className="space-y-4 ">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 ">Account information</h1>
                                    {/* first name */}
                                    <div>
                                        <label for="firstName" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                                        <input onChange={handleAccountInformation} type="text" name="first_name" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full h-9 p-2.5" placeholder="First Name" />
                                    </div>
                                    {/* Middle name */}
                                    <div>
                                        <label for="middleName" className="block mb-2 text-sm font-medium text-gray-900">Middle Name</label>
                                        <input onChange={handleAccountInformation} type="text" name="middle_name" id="midldeName" placeholder="Middle Name" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full h-9 p-2.5" />
                                    </div>
                                    {/* Last name */}
                                    <div>
                                        <label for="lastName" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                                        <input onChange={handleAccountInformation} type="text" name="last_name" id="lastName" placeholder="Last Name" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full h-9 p-2.5" />
                                    </div>
                                    {/* Email */}
                                    <div>
                                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                        <input onChange={handleAccountInformation} type="text" name="email" id="email" placeholder="Email" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full h-9 p-2.5" />
                                    </div>
                                    {/* contact information */}
                                    <div>
                                        <label for="contactInfo" className="block mb-2 text-sm font-medium text-gray-900">Contact Information</label>
                                        <input onChange={handleAccountInformation} type="text" maxlength={11} name="contact_info" id="contactInfo" placeholder="Contact Information" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full h-9 p-2.5" />
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
                                                <input onChange={handleAccountInformation} maxlength={25} type="text" name="address_name" id="addressName" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full h-9 p-2.5" placeholder="Address Name" />
                                            </div>
                                            {/* Street */}
                                            <div>
                                                <label for="street" className="block mb-2 text-sm font-medium text-gray-900">Street</label>
                                                <input onChange={handleAccountInformation} maxlength={25} type="text" name="street" id="street" placeholder="Street" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full h-9 p-2.5" />
                                            </div>
                                            {/* Barangay */}
                                            <div>
                                                <label for="barangay" className="block mb-2 text-sm font-medium text-gray-900">Barangay</label>
                                                <input onChange={handleAccountInformation} maxlength={25} type="text" name="barangay" id="barangay" placeholder="Barangay" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full h-9 p-2.5" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-4 w-1/2">
                                            {/* Province */}
                                            <div>
                                                <label for="province" className="block mb-2 text-sm font-medium text-gray-900">Province</label>
                                                <input onChange={handleAccountInformation} maxlength={25} type="text" name="province" id="province" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full h-9 p-2.5" placeholder="Province" />
                                            </div>
                                            
                                            {/* City */}
                                            <div>
                                                <label for="city" className="block mb-2 text-sm font-medium text-gray-900">City</label>
                                                <input onChange={handleAccountInformation} maxlength={25} type="text" name="city" id="city" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full h-9 p-2.5" placeholder="City" />
                                            </div>
                                            {/* Zip-code */}
                                            <div>
                                                <label for="zipCode" className="block mb-2 text-sm font-medium text-gray-900">Zip-code</label>
                                                <input onChange={handleAccountInformation} maxlength={5} type="text" name="zip_code" id="zipCode" maxLength="4" className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full h-9 p-2.5" placeholder="Zip Code" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <button type="submit"
                    className={`w-full text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-50 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-2.5 text-center ${buttonError ? 'animate-wiggle' : ''}`}>
                    Create account
                </button>
            </form>
        </div>
    </div>
    
  );
}

export default Landing;
