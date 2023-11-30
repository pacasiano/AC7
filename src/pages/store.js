import React, {useState, useEffect}from "react";
import '../App.css';
import ItemSlider from "../components/itemSlider";
import CategorySlider from "../components/categorySlider";

function Store() {

    const [categories, setCategories] = useState([])
    useEffect(() => {
        fetch('/api/product/categories/all')
        .then(res => res.json())
        .then(data => {
            setCategories(data)
        })
    }, [])

    return (
        <div className="transition-all ease-in main pt-16">
            <div className="flex flex-col py-16 lg:px-40 md:px-20">
                <div className="flex justify-start text-xl font-bold px-5">Recently Added</div>
                <ItemSlider /><br/>
                {categories.map((category) => (
                    <>
                        <div className="flex justify-start text-xl font-bold px-5">{category.category}</div>
                        <CategorySlider category={category.category} /><br/>
                    </>
                ))}
            </div>
        </div>
    );
}

export default Store;