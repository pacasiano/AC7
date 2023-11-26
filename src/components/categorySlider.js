import React, { useState, useEffect } from 'react';
import Item from "./item";
import '../App.css';

function CategorySlider(props) {

    const {category: itemCategory} = props;
    console.log(itemCategory)
    
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch('/api/product')
        .then((res) => res.json())
        .then((products) => {
            setProducts(products);
        });
    }, []);

    return (
        <div className="itemSlider">
          <div className="flex justify-start p-5 pl-4 lg:gap-3.5 md:gap-2.5 gap-7 align-middle overflow-scroll whitespace-nowrap scrollbar-hide">
            {products.map((product) => (
                product.category === itemCategory ? (
                    <Item key={product.product_id} product_obj={product} />
                ) : null
            ))}
          </div>
        </div>
      );
}

export default CategorySlider;