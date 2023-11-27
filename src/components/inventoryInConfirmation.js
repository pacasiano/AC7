import React from "react";
import Check from "../imgs/check.png";
import { Link } from "react-router-dom";

export default function Confirmation() {
    return (
        <div className="z-100 h-screen w-screen flex justify-center items-center backdrop-blur-sm bg-white/30 ">
            <div className="fixed bg-gray-100 -mt-20 rounded-xl w-96">
                <div className="p-5 flex flex-col justify-center items-center gap-2">
                    <img src={Check} alt="check" className="w-32 h-32"/>
                    <span className="text-xl font-bold">Inventory-in successful!</span>
                    <Link to="/admin" className="bg-gray-200 p-2 text-center rounded-xl w-60">Continue</Link>
                </div>
            </div>
        </div>
    )
}