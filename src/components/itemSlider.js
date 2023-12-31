import React from "react";
import Item from "./item";
import '../App.css';

let i;
let Items = [];

for(i=1; i<=10; i++){
    Items.push(<Item />);
}

function ItemSlider() {
    return (
        <div className="itemSlider">
                <div className="flex justify-start p-5 pl-4 lg:gap-3.5 md:gap-2.5 gap-7 align-middle overflow-scroll whitespace-nowrap scrollbar-hide">
                    {Items}
            </div>
        </div>
    );
}

export default ItemSlider;