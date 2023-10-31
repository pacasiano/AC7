import React from "react";
import Check from "../imgs/check.png";
import { Link } from "react-router-dom";

export default function Confirmation() {
    return (
        <div className="bg-gray-100 w-96 rounded-3xl">
            <div className="p-5 flex flex-col justify-center items-center gap-2">
                <img src={Check} alt="check" className="w-32 h-32"/>
                <span className="text-xl font-bold">Order successfully placed!</span>
                <Link to="/home" className="bg-gray-200 p-2 text-center rounded-xl w-full">Continue to Home</Link>
            </div>
        </div>
    )
}