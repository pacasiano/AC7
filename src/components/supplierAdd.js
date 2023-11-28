import React, {useContext, useState, useEffect} from "react";
import "../App.css";
import { myContext } from "../context/adminContext";
import Check from "../imgs/check.png";

export default function SupplierAdd() {

    // Context and states
    const { setPage } = useContext(myContext);
    const [invalidInput, setInvalidInput] = useState(false);
    const [success, setSuccess] = useState(false);

    // Supplier info
    const [supplierInfo, setSupplierInfo] = useState({
        supplier_name: "",
        contact_info: "",
    });

    // Address info
    const [addressInfo, setAddressInfo] = useState({
        name: "",
        street: "",
        barangay: "",
        city: "",
        province: "",
        zip_code: "",
    });

    // Value of the fields, used to check if they are empty
    const [value, setValue] = useState({
        supplier_name: false,
        contact_info: false,
        name: false,
        street: false,
        barangay: false,
        city: false,
        province: false,
        zip_code: false,
    });

    // handles input field changes in supplier info
    function handleSupplierInfo(event) {
        setSupplierInfo({
            ...supplierInfo,
            [event.target.name]: event.target.value,
        });
    }

    // handles input field changes in address info
    function handleAddressInfo(event) {
        setAddressInfo({
            ...addressInfo,
            [event.target.name]: event.target.value,
        });
    }

    // checks input fields that are empty via useEffect that updates whenever handleSupplierInfo or handleAddressInfo is called
    useEffect(() => {
        const validateField = (field, value) => {
          setValue((prevValue) => ({
            ...prevValue,
            [field]: !!value, // Set to true if value exists, false otherwise
          }));
        };
      
        validateField("supplier_name", supplierInfo.supplier_name);
        validateField("contact_info", supplierInfo.contact_info);
        validateField("name", addressInfo.name);
        validateField("street", addressInfo.street);
        validateField("barangay", addressInfo.barangay);
        validateField("city", addressInfo.city);
        validateField("province", addressInfo.province);
        validateField("zip_code", addressInfo.zip_code);
    }, [supplierInfo, addressInfo]);
      
      
    // da form
    function submitForm(e) {
        e.preventDefault();

        // checks if supplier info and address info are empty
        if (Object.values(supplierInfo).includes("") || Object.values(addressInfo).includes("")) {
            setInvalidInput(true);
            setTimeout(() => {
                setInvalidInput(false);
            }, 3000);
            return;
        }else{

            // dito yung post request

            setInvalidInput(false);
            setSuccess(true);
        } 

    }

    return(
        <>
        <Success isModalOpen={success} setPage={setPage}/>
        <Failed isModalOpen={invalidInput}/>
        <div className="px-8 py-8">
        <div className="flex flex-col gap-5">
            <div id="header" className="flex flex-row justify-between">
            <span className="text-xl font-bold">Add Supplier</span>
            <button onClick={() => setPage("viewSuppliers")} className="bg-gray-200 px-2 py-1 rounded-md font-medium">Back</button>
            </div>
            <form onSubmit={submitForm} className="flex flex-col gap-3">

                {/* SUPPLIER INFO */}
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-400">
                        <th className="text-md font-bold border p-2 text-white w-1/5" >
                            Supplier Name
                        </th>
                        <th className="text-md font-bold border p-2 text-white w-1/5" >
                            Contact Info
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-300">
                        <td className="text-sm font-semibold border p-2">
                            <input onChange={handleSupplierInfo} name="supplier_name" type="text" className={`${(invalidInput && !value.supplier_name ) && "border border-red-500"} w-full h-10 text-center`} />
                        </td>
                        <td className="text-sm font-semibold border p-2">
                            <input onChange={handleSupplierInfo} name="contact_info" type="text" className={`${(invalidInput && !value.contact_info ) && "border border-red-500"} w-full h-10 text-center`} />
                        </td>
                        </tr>
                    </tbody>
                </table>

                {/* ADDRESS INFO */}
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-400">
                        <th className="text-md font-bold border p-2 text-white w-1/6" >
                            Name
                        </th>
                        <th className="text-md font-bold border p-2 text-white w-1/6" >
                            Street
                        </th>
                        <th className="text-md font-bold border p-2 text-white w-1/6" >
                            barangay
                        </th>
                        <th className="text-md font-bold border p-2 text-white w-1/6" >
                            City
                        </th>
                        <th className="text-md font-bold border p-2 text-white w-1/6" >
                            Province
                        </th>
                        <th className="text-md font-bold border p-2 text-white w-1/6" >
                           Zip Code
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-300">
                            <td className="text-sm font-semibold border p-2">
                                <input onChange={handleAddressInfo} name="name" className={`${(invalidInput && !value.name ) && "border border-red-500"} w-full h-10 text-center`} />
                            </td>
                            <td className="text-sm font-semibold border p-2">
                                <input onChange={handleAddressInfo} name="street" className={`${(invalidInput && !value.street ) && "border border-red-500"} w-full h-10 text-center`} />
                            </td>
                            <td className="text-sm font-semibold border p-2">
                                <input onChange={handleAddressInfo} name="barangay" className={`${(invalidInput && !value.barangay ) && "border border-red-500"} w-full h-10 text-center`} />
                            </td>
                            <td className="text-sm font-semibold border p-2">
                                <input onChange={handleAddressInfo} name="city" className={`${(invalidInput && !value.city ) && "border border-red-500"} w-full h-10 text-center`} />
                            </td>
                            <td className="text-sm font-semibold border p-2">
                                <input onChange={handleAddressInfo} name="province" className={`${(invalidInput && !value.province ) && "border border-red-500"} w-full h-10 text-center`} />
                            </td>
                            <td className="text-sm font-semibold border p-2">
                                <input onChange={handleAddressInfo} name="zip_code" className={`${(invalidInput && !value.zip_code ) && "border border-red-500"} w-full h-10 text-center`} />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className={`${invalidInput === true ? "animate-wiggle" : ""} text-sm w-full flex justify-end font-semibold p-2`}>
                    <button type="submit" className={` bg-green-600 p-3 w-44 rounded-xl text-white`}>SUBMIT</button>
                </div>
            </form>
            </div>
        </div>
        </>
    );
}

const Modal = ({ isOpen, children }) => {
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          {children}
        </div>
      </div>
    );
  };
  
  function Success({isModalOpen, setPage}) {
  
    return (
    <div className="fixed backdrop-blur-sm bg-black/20 drop-shadow-xl -translate-x-56 z-50">
        <Modal isOpen={isModalOpen}>
            <div className="h-screen w-screen flex justify-center items-center backdrop-blur-sm bg-white/30 ">
                <div className="fixed bg-gray-100 -mt-20 rounded-xl w-96">
                    <div className="p-5 flex flex-col justify-center items-center gap-2">
                        <img src={Check} alt="check" className="w-32 h-32"/>
                        <span className="text-xl font-bold">Successfully added Supplier!</span>
                        <button onClick={() => setPage("viewSuppliers")} className="bg-gray-200 p-2 text-center rounded-xl w-60">Continue</button>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
    );
  };


  function Failed({isModalOpen}) {
  
    return (
      <div className="fixed pt-5">
        <Modal isOpen={isModalOpen}>
          <div className="w-screen flex justify-center items-center -translate-x-52">
              <div className="bg-gray-50 p-3 rounded-xl w-1/2 shadow-md border animate-bounce2">
                <div className="text-red-500 text-md font-semibold text-center">Error, please fill in all details!</div>
              </div>
          </div>
        </Modal>
      </div>
    );
  };