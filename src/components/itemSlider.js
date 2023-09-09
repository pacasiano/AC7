import React, { useState, useEffect } from 'react';
import Item from "./item";
import '../App.css';


// for(i=1; i<=10; i++){
//     Items.push(<Item />);
// }


function ItemSlider() {
    
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetch('/api/products')
        .then((res) => res.json())
        .then((products) => {
            setProducts(products);
        });
    }, []);

    // let Items = [];
    // for(let i = 1; i <= 3; i++){
    //     Items.push(<Item product_obj={products[i]}/>);
    // }

    return (
        <div className="itemSlider">
                <div className="flex justify-start p-5 pl-4 lg:gap-3.5 md:gap-2.5 gap-7 align-middle overflow-scroll whitespace-nowrap scrollbar-hide">
                    {/* {Items} */}
                    <Item product_obj={products[0]}/>
            </div>
        </div>
    );
}

export default ItemSlider;