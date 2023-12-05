import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "../App.css";

function Item(props) {

  const [price, setPrice] = useState(0)

  useEffect(() => {
    fetch(`/api/stock/${props.product_obj.product_id}`)
      .then(res => res.json())
      .then(data => setPrice(data.price))
      .catch(err => console.log("Item with Quantity 0"));

  }, [props.product_obj.product_id])

  function submitForm(e) {
    e.preventDefault()

    fetch('/api/item', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        product_price: price,
        product_id: props.product_obj.product_id
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      window.location.href = '/AC7/cart';
    })
  }

  const imgPath = require(`../imgs/product-${props.product_obj.product_id}.png`)

  return (
    <>
    {price !== 0 &&
    <form onSubmit={submitForm}>
      <div className="item shadow-md rounded-md">
        <div className="flex flex-col justify-center items-center gap-3 w-auto">
          <div className="w-11/12 h-52 pt-3">
            <Link to={`/product/${props.product_obj.product_id}`}>
              <img className="object-cover w-full h-full rounded-md" src={imgPath} alt="Item1" />
            </Link>
          </div>
          <div className="flex flex-col px-2 justify-start gap-2 w-full">
            <div className="flex flex-col pl-3 w-full">
              <textarea className="flex justify-start text-start m-0 pb-2 text-xl font-extrabold focus:outline-none resize-none" name="product_name" value={props.product_obj.name} readOnly={true}/>
              <input className="flex m-0 justify-start pb-2 text-sm font-semibold focus:outline-none" name="product_price" value={`₱${price}`} readOnly={true} />
              <textarea className="flex m-0 justify-start text-xs focus:outline-none h-12 resize-none" value={props.product_obj.description} readOnly={true}/>
              <input className="visibility: hidden" name="product_id" defaultValue={props.product_obj.product_id}/>
              {/* props is the parameter name here. product_obj is the parameter name we set in itemSlider.js 
              which contains the columns we queried from routes/products.js. 
            Basically, 'props' contains a nested obj. We access the nested obj using 'product_obj'*/}
            </div>
            <div className="flex justify-center py-2">
              <button className="flex items-center transition-all hover:bg-black justify-center w-11/12 h-10 mb-2 text-md font-bold text-white bg-black/80 rounded-md">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </form>
    }
    </>
  );
}

export default Item;