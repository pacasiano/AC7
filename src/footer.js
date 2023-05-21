import React from "react";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

function footer() {

    return (
  
        <div className="footer">
            <footer className="w-full bottom-0">
                <div className="flex justify-between items-stretch bg-gray-100 h-24 text-md">
                    <div className="flex justify-start gap-4 pl-8 font-bold">
                        <div className="flex items-center m-0 text-2xl">Find us at</div>
                        <div className="flex items-center m-0 text-5xl"><FontAwesomeIcon icon={faFacebook} style={{color: "#000000",}} /></div>
                    </div>
                    <div className="flex jusitfy-evenly gap-4 pr-8 font-bold">
                        <div className="flex flex-col justify-center pr-7 gap-1 text-xs">
                            <div className="flex items-center m-0 text-xl">Contact</div>
                            <div className="flex items-center m-0"><FontAwesomeIcon icon={faPhone} style={{color: "#000000",}} />&nbsp;09164770793</div>
                            <div className="flex items-center m-0"><FontAwesomeIcon icon={faEnvelope} style={{color: "#000000",}} />&nbsp;Ac7copr95@gmail.com</div>
                        </div>
                        <div className="flex flex-col justify-center gap-1 text-xs">
                            <div className="flex items-center m-0 text-xl">FAQ</div>
                            <div className="flex items-center m-0">Privacy Policy</div>
                            <div className="flex items-center m-0">Terms of Service</div>
                        </div>   
                    </div>
                </div>
            </footer>
        </div>
      );
}

export default footer;