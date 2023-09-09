import React, { useState, useEffect } from 'react';
import Item from "./item";
import '../App.css';

function ItemSlider() {
    
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch('/api/products')
        .then((res) => res.json())
        .then((products) => {
            setProducts(products);
        });
    }, []);

    return (
        <div className="itemSlider">
          <div className="flex justify-start p-5 pl-4 lg:gap-3.5 md:gap-2.5 gap-7 align-middle overflow-scroll whitespace-nowrap scrollbar-hide">
            {products.map((product) => (
              <Item key={product.product_id} product_obj={product} />
            ))}
          </div>
        </div>
      );
}

export default ItemSlider;