import React, {useState} from 'react';
import Item1 from "../imgs/Item1.png";
import { Form, Link } from "react-router-dom";
import "../App.css";

function Item(props) {

  //sends the cookies which contains the account_id of the account that logged in
  const [cookies, setCookies] = useState(document.cookie);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const response = await fetch('/api/item', {
        method: 'POST',
        body: formData,
        headers: {
          'Cookie': cookies, // Include cookies in the headers
        },
      });

      if (response.ok) {
        // Handle a successful response from the server
        console.log('Form submitted successfully.');
      } else {
        // Handle errors here
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form action="/api/item" method="POST">
      <div className="item shadow-md rounded-md">
        <div className="flex flex-col justify-center items-center gap-3 w-auto">
          <div className="w-11/12 h-52 pt-3">
            <Link to="/product">
              <img className="object-none w-full h-full rounded-md" src={Item1} alt="Item1" />
            </Link>
          </div>
          <div className="flex flex-col px-2 justify-start gap-2 w-full">
            <div className="flex flex-col pl-3 w-full">
              <textarea className="flex justify-start text-start m-0 pb-2 text-xl font-extrabold focus:outline-none resize-none" name="product_name" value={props.product_obj.name} readOnly={true}/>
              <input className="flex m-0 justify-start pb-2 text-sm font-semibold focus:outline-none" name="product_price" value={`$${props.product_obj.price}`} readOnly={true} />
              <textarea className="flex m-0 justify-start text-xs focus:outline-none h-12 resize-none" value={props.product_obj.description} readOnly={true}/>
              <input className="visibility: hidden" name="product_id" value={props.product_obj.product_id}/>
              {/* props is the parameter name here. product_obj is the parameter name we set in itemSlider.js 
              which contains the columns we queried from routes/products.js. 
            Basically, 'props' contains a nested obj. We access the nested obj using 'product_obj'*/}
            </div>
            <div className="flex justify-center py-2">
              <button className="flex items-center justify-center w-11/12 h-10 mb-2 text-md font-bold text-white bg-black rounded-md">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Item;