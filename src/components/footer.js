import React from "react";
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

function Footer() {

    return (
  
        <div className="footer">
            <footer className="w-full bottom-0">
                <div className="flex justify-between items-stretch bg-gray-100 h-36 text-md">
                    <div className="flex justify-start gap-2 lg:pl-8 pl-2 font-bold ">
                        <div className="flex items-center m-0 md:text-2xl text-md ">Find us at</div>
                        <div className="flex items-center m-0 md:text-5xl text-4xl "><FontAwesomeIcon icon={faFacebook} style={{color: "#000000",}} /></div>
                    </div>
                    <div className="flex jusitfy-evenly md:gap-4 gap-0 md:pr-8 pr-2 font-bold">
                        <div className="flex flex-col justify-center pr-7 gap-1 lg:text-xs text-xxs ">
                            <div className="flex items-center m-0 md:text-xl text-sm">Contact</div>
                            <div className="flex items-center m-0"><FontAwesomeIcon icon={faPhone} style={{color: "#000000",}} />&nbsp;09164770793</div>
                            <div className="flex items-center m-0"><FontAwesomeIcon icon={faEnvelope} style={{color: "#000000",}} />&nbsp;Ac7copr95@gmail.com</div>
                        </div>
                        <div className="flex flex-col justify-center gap-1 lg:text-xs text-xxs ">
                            <div className="flex items-center m-0 md:text-xl text-sm">FAQ</div>
                            <div className="flex items-center m-0">Privacy&nbsp;Policy</div>
                            <div className="flex items-center m-0">Terms&nbsp;of&nbsp;Service</div>
                        </div>   
                    </div>
                </div>
            </footer>
        </div>
      );
}

export default Footer;