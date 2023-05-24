import React from "react";
import ItemSlider from "../itemSlider";
import bodypic from "../bodypic.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

function main() {
    return (
        <div className="main">
            <body className=""> {/* h-screen */}
            <div className="relative top-0">
                <img src={bodypic} className="object-fill h-15" alt="HomeBodyPic"/>
                <div className="absolute flex flex-col justify-start items-start text-left bottom-1/3 ml-16 lg:w-80 sm:w-60 w-52 translate-y-7 -translate-x-5">
                    <div className="text-xs">Welcome AC7 Dazzle White</div>
                    <div className="lg:text-5xl/tight sm:text-3xl/tight text-xl font-bold">Beauty is our Passion, and yours too.</div>
                    <button className="bg-black opacity-80 mt-2 text-white px-3 py-1 px1 lg:text-md sm:text-sm text-xs rounded-md">Shop Now <FontAwesomeIcon className="font-thin text-sm" icon={faArrowRight} style={{color: "#fffff",}} /></button>
                </div>
            </div>
            <div className="flex justify-start flex-col lg:px-40 md:px-20 py-7">
                <div className="flex justify-start text-xl font-bold px-5">Recently Added</div>
                <ItemSlider />
            </div>
            </body>
        </div>
    );
};

export default main;