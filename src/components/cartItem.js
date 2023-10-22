import React, {useState} from 'react';
import Item1 from "../imgs/Item1.png";

function CartItem({item}) {
    
    const {name, price, quantity, product_id} = item;
    let displayQty = parseInt(quantity);
    // console.log("Cart Item Quantity : " + displayQty)
    // console.log(item)
    
    const [hookQty, setQuantity] = useState(displayQty);
    const [total, setTotal] = useState(price);
  
    const incrementQuantity = () => {
      setQuantity(hookQty + 1);
      let totalCalc = parseInt(total) + parseInt(price); 
      setTotal(totalCalc.toFixed(2));
    };
  
    const decrementQuantity = () => {
      if (hookQty > 1) {
        setQuantity(hookQty - 1);
        let totalCalc = parseInt(total) - parseInt(price); 
        setTotal(totalCalc.toFixed(2));
      }
    };
    //use useEffect to monitor change in hookQty. After some delay, record the qty in db
    //to remove an item, wrap the item in a form with method=DELETE
  
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
                <form action={`/api/item/${product_id}`} method="POST">
                  <div className="flex flex-col justify-start items-start">
                    <div className="pl-2">
                      <div className="flex justify-start text-xl font-bold pt-0 pb-2">
                        {name}
                      </div>
                      <div className="flex justify-start font-normal text-sm ">
                        ${price}
                      </div>
                      <button className="absolute text-xs font-thin ">
                        Remove
                      </button>
                    </div>  
                  </div>
                </form>
              </td>
              <td className="pb-1 ">
                <div className="flex flex-row gap-5 justify-center"> 
                  <button onClick={decrementQuantity} className="flex justify-center m-0 mt-1 p-1 text-xl hover:font-extrabold ">
                    -
                  </button>
                    <div className="flex justify-center m-0 pt-2 text-xl font-light ">
                      {hookQty}
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