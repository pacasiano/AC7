import React, { useState } from 'react';
import Item1 from "./Item1.png";

function Item() {

    var price = 100;
    const [quantity, setQuantity] = useState(1);
    let total = quantity * price;

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
      };
    
    const decrementQuantity = () => {
        if (quantity > 0) {
          setQuantity(quantity - 1);
        }
      };

    return (
        <div className="item shadow-md rounded-md">
            <div className="flex flex-col justify-center items-center gap-1 w-auto">
                <img src={Item1} className="object-fill h-15 px-3 pt-3 rounded-md"/>
                <div className="flex flex-col px-2 justify-start gap-2 w-40">
                    <div className="flex flex-col pl-3">
                        <div className="flex justify-start m-0 text-md font-extrabold">Item</div>
                        <div className="flex m-0 justify-start text-xs">$100.00</div>
                    </div>
                    <div className="flex flex-row gap-2 justify-start pr-4">
                        <div className="m-0 w-2/4 text-xs font-bold">Total</div>
                        <div className="m-0 w-2/4 text-xs font-bold">Quantity</div>
                    </div>
                    <div className="flex flex-row gap-2 pr-4">
                        <div className="inline-block align-bottom m-0 w-2/4 text-sm pt-1">${total}</div>
                        <div className="flex flex-row  w-2/4">
                            <button onClick={decrementQuantity} className="flex justify-center m-0 p-1 w-1/3 align-middle text-xs border border-black">-</button>
                            <div className="inline-block align-middle m-0 p-1 w-1/3 text-xs border-y border-black font-semibold">{quantity}</div>
                            <button onClick={incrementQuantity} className="flex justify-center m-0 p-1 w-1/3 align-middle text-xs border border-black">+</button>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="flex items-center justify-center w-11/12 mb-2 h-6 text-xs font-bold text-white bg-black rounded-md">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
    }

export default Item;