import React, {useState,useEffect} from 'react';
import Item1 from "../imgs/Item1.png";

function CartItem({item, setReloadData, reloadData}) {

  //GET ACCOUNT_ID COOKIE
  const cookie = document.cookie;
  function getAcctIdFromCookie (cookieStr) {
    //if browser has more than one cookie, the if statement will run
    if (cookieStr.indexOf(';') > 0) {
        //document.cookie is a string. We use .split() to convert it to an array with each cookie being an element
        const cookiesArray = cookieStr.split(';');
        for(let i = 0; i < cookiesArray.length; i++) {
            if (cookiesArray[i].indexOf('account_id') > 0) {
                //find the cookie with 'account_id' substring
                const id = cookiesArray[i].replace('account_id=', '').trim();
                // console.log(id)
                return id;
            }
        }
    }
    else {
        const id = cookie.slice(cookie.indexOf('=')+1);
        // console.log(id)
        return id;
    }
  }

  const accountId = getAcctIdFromCookie(cookie);

  const {name, price, quantity, product_id} = item;
    
  const [hookQty, setQuantity] = useState(quantity);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    setQuantity(quantity);
  }, []); // please dont change the dependencies
  
  const [total, setTotal] = useState((price * quantity).toFixed(2));

  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetch(`/api/product/${product_id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, [hookQty, product_id]);

  const {quantity: maxStockQty} = product || {};
  
  const incrementQuantity = () => {
    if (hookQty < maxStockQty) {
      setQuantity(hookQty + 1);
      let totalCalc = parseInt(total) + parseInt(price); 
      setTotal(totalCalc.toFixed(2));

    }
  };
  
  const decrementQuantity = () => {
    if (hookQty > 1) {
      setQuantity(hookQty - 1);
      let totalCalc = parseInt(total) - parseInt(price); 
      setTotal(totalCalc.toFixed(2));
    }
  };

  //use useEffect to monitor change in hookQty. After some delay, record the qty in db 
  useEffect(() => {
    
    let timeoutId;

    const makeFetch = () => {

      fetch(`/api/cart/${accountId}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          product_id: product_id,
          quantity: hookQty
        })
      })
        .then(() => {
          setReloadData(!reloadData);
          console.log('Updated cart quantity in database')
        })
        .catch((err) => {
          console.error(err);
        });
    };

    timeoutId = setTimeout(makeFetch, 1000);
    return () => clearTimeout(timeoutId);

    
  }, [submit]);// please dont change the depencies

  // will only work if hookQty is not equal to quantity
  useEffect(() => {
    if (hookQty !== quantity) {
      setSubmit(!submit);
    }
  }, [quantity, hookQty]); // please dont change the depencies

  const imgPath = require(`../imgs/product-${product_id}.png`)

    return (
        <table className="table-fixed w-full">
          <tbody>
            <tr>
              <td className="p-2">
                <div className="flex justify-center">
                <img  
                  src={imgPath}
                  className="object-cover rounded-md w-full h-36"
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
                        ₱{price}
                      </div>
                      <button className="transition-all hover:font-semibold text-black/95 absolute text-xs font-thin ">
                        Remove
                      </button>
                    </div>  
                  </div>
                </form>
              </td>
              <td className="pb-1 ">
                <div className="flex flex-row gap-5 justify-center"> 
                  <button onClick={decrementQuantity} className="transition-all flex justify-center m-0 mt-1 p-1 text-xl hover:font-extrabold ">
                    -
                  </button>
                    <div className="flex justify-center m-0 pt-2 text-xl font-light ">
                      {hookQty}
                    </div>
                  <button onClick={incrementQuantity} className="transition-all flex justify-center m-0 mt-1 p-1 text-xl hover:font-extrabold ">
                      +
                  </button>
                </div>
              </td>
              <td className="text-xl font-medium ">
                <div className="flex justify-center">
                  ₱{total}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
    );
}

export default CartItem;