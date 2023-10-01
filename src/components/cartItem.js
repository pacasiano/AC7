import React, {useState} from 'react';
import Item1 from "../imgs/Item1.png";

function CartItem({item}) {
    
    const {name, price} = item;
    
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(price);
  
    const incrementQuantity = () => {
      setQuantity(quantity + 1);
      let totalCalc = parseInt(total) + parseInt(price); 
      setTotal(totalCalc.toFixed(2));
    };
  
    const decrementQuantity = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
        let totalCalc = parseInt(total) - parseInt(price); 
        setTotal(totalCalc.toFixed(2));
      }
    };
  
    return (
        <table className="table-fixed w-full">
          <tbody>
            <tr>
              <td className="p-2">
                <div className="flex justify-center">
                <img  
                  src={Item1}
                  className="object-scale-down rounded-md w-full h-36"
                  alt="Item1"
                />
                </div>
              </td>
              <td className="">
                <div className="flex flex-col justify-center items-center ">
                  <div>
                    <div className="flex justify-start text-xl font-bold pt-0 pb-2  ">
                      {name}
                    </div>
                    <div className="flex justify-start font-normal text-sm ">
                      ${price}
                    </div>
                    <button className="absolute  text-xs font-thin ">
                      Remove
                    </button>
                  </div>  
                </div>
              </td>
              <td className="pb-1 ">
                <div className="flex flex-row gap-5 justify-center"> 
                  <button onClick={decrementQuantity}className="flex justify-center m-0 mt-1 p-1 text-xl hover:font-extrabold ">
                    -
                  </button>
                    <div className="flex justify-center m-0 pt-2 text-xl font-light ">
                      {quantity}
                    </div>
                  <button onClick={incrementQuantity} className="flex justify-center m-0 mt-1 p-1 text-xl hover:font-extrabold ">
                      +
                  </button>
                </div>
              </td>
              <td className="text-xl font-medium ">
                <div className="flex justify-center">
                  ${total}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
    );
  }

export default CartItem;