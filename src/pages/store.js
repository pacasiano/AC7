import React from "react";
import '../App.css';
import ItemSlider from "../components/itemSlider";

function Store() {

    return (
        <div className="main pt-16">
            <div className="flex flex-col py-16 lg:px-40 md:px-20">
                <div className="flex justify-start text-xl font-bold px-5">Recently Added</div>
                <ItemSlider /><br/>
                <div className="flex justify-start text-xl font-bold px-5">Beauty Products</div>
                <ItemSlider /><br/>
                <div className="flex justify-start text-xl font-bold px-5">Forda Clout</div>
                <ItemSlider />
            </div>
        </div>
    );

}

export default Store;