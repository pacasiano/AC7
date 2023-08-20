import React from 'react';
import Item1 from "../imgs/Item1.png";
import { Link } from "react-router-dom";
import "../App.css";

function Item() {

  var name = "Beauty Pill";
  var price = 100;

  return (
    <div className="item shadow-md rounded-md">
      
      <div className="flex flex-col justify-center items-center gap-1 w-auto">
        <Link to="/product">
        <img className="object-cover h-15 px-3 pt-3 rounded-md aspect-auto" src={Item1} alt="Item1" />
        </Link>
        <div className="flex flex-col px-2 justify-start gap-2 lg:w-52 w-40">
          <div className="flex flex-col pl-3">
            <div className="flex justify-start m-0 text-xl font-extrabold">{name}</div>
            <div className="flex m-0 justify-start text-xs font-semibold">${price}</div>
            <div className="flex m-0 justify-start text-xs">I am the description</div>
          </div>
          <div className="flex justify-center py-2">
            <button className="flex items-center justify-center w-11/12 mb-2 h-6 text-xs font-bold text-white bg-black rounded-md">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;