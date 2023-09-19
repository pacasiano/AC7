import React from 'react';
import Item1 from "../imgs/Item1.png";
import { Form, Link } from "react-router-dom";
import "../App.css";

function Item(props) {

  return (
    <form action="/api/cart" method="POST">
      <div className="item shadow-md rounded-md">
        
        <div className="flex flex-col justify-center items-center gap-1 w-auto">
          <Link to="/product">
          <img className="object-cover h-15 px-3 pt-3 rounded-md aspect-auto" src={Item1} alt="Item1" />
          </Link>
          <div className="flex flex-col px-2 justify-start gap-2 lg:w-52 w-40">
            <div className="flex flex-col pl-3">
              <input className="flex justify-start m-0 text-xl font-extrabold" value={props.product_obj.name} readOnly={true}/>
              <input className="flex m-0 justify-start text-xs font-semibold" value={`$${props.product_obj.price}`} readOnly={true} />
              <input className="flex m-0 justify-start text-xs" value={props.product_obj.description} readOnly={true}/>
              {/* props is the parameter name here. product_obj is the parameter name we set in itemSlider.js 
              which contains the columns we queried from routes/products.js. 
            Basically, 'props' contains a nested obj. We access the nested obj using 'product_obj'*/}
            </div>
            <div className="flex justify-center py-2">
              <button className="flex items-center justify-center w-11/12 mb-2 h-6 text-xs font-bold text-white bg-black rounded-md">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Item;