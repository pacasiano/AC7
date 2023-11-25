import { useEffect, useState } from 'react';
import Item1 from "../imgs/Item1.png";
import "../App.css";
import { useParams } from 'react-router-dom';

function Product() {

  const {product_id} = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`/api/product/${product_id}`)
    .then(res => res.json())
    .then(data => setProducts(data))
  }, [])

  const {name: itemName , description, price, quantity: maxBatchQty} = products || {};

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    if (quantity < maxBatchQty) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  function submitForm() {
    fetch('/api/item', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        quantity: quantity,
        product_id: product_id,
        product_price: price
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log("Data message" + data.message)
      window.location.href = '/AC7/cart';
    })
    .catch((err) => {
      console.error("Error: ", err)
    })
  }

  return (
    <div className="flex flex-col lg:-mt-20 mt-0 justify-center h-screen ">
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="flex flex-col md:flex-row lg:px-0 px-9 py-15 justify-center  border-red-600 overflow-clip">
          <img
            alt="ecommerce"
            className="lg:w-3rem md:w-2rem w-1rem object-cover object-center rounded-xl aspect-auto  border-yellow-600"
            src={Item1}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6  border-blue-600">
            <h1 className="text-gray-900 text-3xl title-font pb-3 font-medium mb-1">
              {itemName}
            </h1>
            <p className="leading-relaxed">
              {description}
            </p>
            <div className="flex items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
            <div className="flex flex-row justify-around">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${price}
              </span>
              <span className="flex flex-row gap-5">
                <button
                  onClick={decrementQuantity}
                  className="flex justify-center m-0 mt-1 p-1 w-1/3 align-middle text-xl hover:font-extrabold"
                >
                  -
                </button>
                <div className="inline-block align-middle p-1 w-1/3 text-2xl font-semibold">
                  {quantity}
                </div>
                <button
                  onClick={incrementQuantity}
                  className="flex justify-center m-0 mt-1 p-1 w-1/3 align-middle text-xl hover:font-extrabold"
                >
                  +
                </button>
              </span>
              <button onClick={submitForm} className="flex justify-center items-center text-white bg-black border-0 px-6 focus:outline-none hover:scale-105 rounded">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Product;
