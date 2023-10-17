import React from "react";
import ItemSlider from "../components/itemSlider";
import bodypic from "../imgs/bodypic.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

function Main() {
    return (
        <div className="main">
            <body className=""> {/* h-screen */}
            <div className="relative top-0">
                <div className="shrink-0"><img src={bodypic} className="object-cover w-full h-72 sm:h-80 md:h-96 lg:h-2/3" alt="HomeBodyPic"/></div>
                <div className="absolute flex flex-col justify-start items-start text-left bottom-1/3 ml-16 lg:w-80 sm:w-60 w-52 -translate-x-5">
                    <div className="text-md">Welcome AC7 Dazzle White</div>
                    <div className="lg:text-5xl/tight md:text-3xl/tight sm:text-2xl/tight text-xl font-bold">Beauty is our Passion, and yours too.</div>
                    <button className="bg-black opacity-80 mt-2 text-white px-3 py-1 px1 text-md rounded-md">Shop Now <FontAwesomeIcon className="font-thin text-sm" icon={faArrowRight} style={{color: "#fffff",}} /></button>
                </div>
            </div>
            <div className="flex justify-start flex-col lg:px-40 md:px-20 py-16">
                <div className="flex justify-start text-xl font-bold px-5">Recently Added</div>
                <ItemSlider />
            </div>
            </body>
        </div>
    );
};

export default Main;