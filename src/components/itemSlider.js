import React, { useState, useEffect } from 'react';
import Item from "./item";
import '../App.css';

function ItemSlider() {
    
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch('/api/product')
        .then((res) => res.json())
        .then((products) => {
            setProducts(products);
        });
    }, []);

    const [batch, setBatch] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }, [loading]);
    
    useEffect(() => {
        fetch('/api/stock')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setBatch(data)
            })
    }, []);
    

    return (
        <>
        {batch.length !== 0 ? (
        <div className="itemSlider">
          <div className="flex justify-start p-5 pl-4 lg:gap-3.5 md:gap-2.5 gap-7 align-middle overflow-scroll whitespace-nowrap scrollbar-hide">
            {products.map((item) => (
                <Item key={item.product_id} product_obj={item} />
            ))}
          </div>
        </div>
        ) : (
        loading ? (
        <div className="flex justify-center items-center py-20">
            <div className="flex flex-col justify-center items-center">
                <div className="animate-spin rounded-full border-t-4 border-black border-solid h-12 w-12"></div>
            </div>
        </div>
        ):(
        <div className="flex justify-center items-center  py-20">
            <div className="flex flex-col justify-center items-center">
                <div className="text-2xl font-bold">No Items Available</div>
            </div>
        </div>
        ))}
        </>
      );
}

export default ItemSlider;