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
    ...products.map((product) => ({ id: product.id, name: product.name })),
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
    }, 500); // Adjust the delay time in milliseconds (e.g., 500ms)

    return () => {
      clearTimeout(delayTimeout); // Clear the timeout on cleanup
      setIsLoading(false); // Ensure loading is reset on cleanup
    };
  }, [searchTerm, someDataArray]);

  return (
        <>
        <div className="relative">
          <div className="absolute inset-y-[8px] left-2 items-center text-md m-0 hover:cursor-pointer"><button onClick={(e) => setSearchTerm(e.target.value)}><FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#000000", }} /></button></div>
          <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex justify-center items-center rounded-md caret-black pl-8 my-1 w-full h-8 text-base overflow-clip hover:shadow-xl focus:shadow-xl focus:outline-none shadow-sm" />
            <div id="searchResult" className={`absolute w-full translate-y-0 bg-white py-2 px-5 drop-shadow-xl rounded-xl ${searchTerm.length === 0 ? 'hidden' : ''}`}>
              {isLoading ? (
                <div className="flex items-center text-blue-900">
                  <MdSearch className="animate-spin mr-2" />{' '}
                  <span className="backdrop-blur-sm">Loading...</span>
                </div>
              ) : (
                searchResults.length > 0 ? (
                    <ul>
                      {searchResults.map(item => (
                        <li key={item.id}><Link className="cursor-pointer hover:font-semibold">{item.name}</Link></li>
                      ))}
                    </ul>
                ) : (
                  <p>No results</p>
                )
              )}
              </div>
        </div>
        </>
  );

}



export default Search;