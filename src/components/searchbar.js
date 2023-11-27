import React, { useState , useEffect , useMemo } from "react";
import { MdSearch } from 'react-icons/md';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import { Link } from "react-router-dom";

function Search() {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/product')
    .then((res) => res.json())
    .then((products) => {
        setProducts(products);
    });
}, []);

const someDataArray = useMemo(() => [
    // ...otherData
    ...products.map((product) => ({ id: product.product_id, name: product.name })),
], [products]);


  useEffect(() => {
    if (searchTerm === '') {
      setSearchResults([]);
      return;
    }

    setIsLoading(true); // Start loading
    const delayTimeout = setTimeout(() => {
      const filteredResults = someDataArray.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSearchResults(filteredResults);
      setIsLoading(false); // End loading
    }, 200); // Adjust the delay time in milliseconds (e.g., 500ms)

    return () => {
      clearTimeout(delayTimeout); // Clear the timeout on cleanup
      setIsLoading(false); // Ensure loading is reset on cleanup
    };
  }, [searchTerm, someDataArray]);

  function redirectToProductPage(id) {
    window.location.href = `/AC7/product/${id}`
  }

  return (
        <>
        <div className="relative w-full">
          <div className="absolute inset-y-[8px] left-2 items-center text-md m-0 hover:cursor-pointer"><button><FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#000000", }} /></button></div>
          <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex justify-center items-center rounded-md caret-black pl-8 my-1 w-full h-8 text-base overflow-clip hover:shadow-xl focus:shadow-xl focus:outline-none shadow-sm" />
            <div id="searchResult" className={`absolute w-full translate-y-0 pt-2 drop-shadow-2xl ${searchTerm.length === 0 ? 'hidden' : ''}`}>
              {isLoading ? (
                <div className="flex items-center bg-white py-2 px-5 w-full rounded-md text-blue-900">
                  <MdSearch className="animate-spin mr-2" />{' '}
                  <span className="backdrop-blur-sm">Loading...</span>
                </div>
              ) : (
                searchResults.length > 0 ? (
                    <div className="flex flex-col bg-white w-full rounded-md">
                      {searchResults.map(item =>  (
                        <Link onClick={() => redirectToProductPage(item.id)} className="cursor-pointer font-normal hover:font-medium whitespace-nowrap">
                        <div key={item.id} className="hover:bg-gray-200 py-2 pl-3 rounded-md">{item.name}</div>
                        </Link>
                      ))}
                    </div>
                ) : (
                  <p className="bg-white py-2 px-5 w-full rounded-md">No results</p>
                )
              )}
              </div>
        </div>
        </>
  );

}



export default Search;