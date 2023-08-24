import React, { useState , useEffect , useMemo } from "react";
import { MdSearch } from 'react-icons/md';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

function Search() {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const someDataArray = useMemo(() => [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banane' },
    { id: 3, name: 'Cherry' },
    // ...
  ], []);

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
          <div className="absolute inset-y-[4px] left-1 items-center text-md m-0 hover:cursor-pointer"><button onClick={(e) => setSearchTerm(e.target.value)}><FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#000000", }} /></button></div>
            <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex justify-center items-center rounded-md caret-black pl-6 my-1 w-full text-base overflow-clip hover:shadow-xl focus:shadow-xl focus:outline-none shadow-sm" />
              <div id="searchResult" className={`absolute w-full translate-y-4 bg-gray-200 drop-shadow-xl rounded-xl py-2 px-4 ${searchTerm.length === 0 ? 'hidden' : ''}`}>
              {isLoading ? (
                <div className="flex items-center text-blue-900">
                  <MdSearch className="animate-spin mr-2" />{' '}
                  <span className="backdrop-blur-sm">Loading...</span>
                </div>
              ) : (
                searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map(item => (
                      <li key={item.id}>{item.name}</li>
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