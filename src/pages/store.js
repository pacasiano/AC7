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

    console.log(categories)

    const [products, setProducts] = useState([]);
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
                setProducts(data)
            })
    }, []);

    return (
        <>
        {products.length !== 0 ? (
        <div className="transition-all ease-in main pt-16 min-h-screen">
            <div className="flex flex-col py-16 lg:px-40 md:px-20">
                <div className="flex justify-start text-xl font-bold px-5">Recently Added</div>
                <ItemSlider /><br/>
                {categories.map((category) => (
                    <div key={category.category}>
                        <div className="flex justify-start text-xl font-bold px-5">{category.category}</div>
                        <CategorySlider category={category.category} /><br/>
                    </div>
                ))}
            </div>
        </div>
        ) : (
        loading ? (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col justify-center items-center">
                <div className="animate-spin rounded-full border-t-4 border-black border-solid h-12 w-12"></div>
            </div>
        </div>

        ):(
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" strokeWidth={0.7} stroke="currentColor" className="w-72 h-72">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                </svg>
                <div className="text-5xl font-bold">Store is currently empty</div>
                <div className="text-xl font-semibold">Please contact the administrator</div>
            </div>
        </div>
        )
        )}
        </>
    );
}

export default Store;