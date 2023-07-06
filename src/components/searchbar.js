import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

function Search() {

  const [search, setSearch] = useState("");

  return (
        <div className="flex relative">
            <div className="absolute inset-y-[4px] left-2 items-center text-md m-0 hover:cursor-pointer"><button onClick={() => setSearch(search)}><FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#000000",}} /></button></div>
            <input id="search" type="search" className="flex justify-center items-center rounded-md caret-black pl-6 pr-2 m-1 w-44 text-base overflow-clip hover:shadow-xl focus:shadow-xl focus:outline-none shadow-sm" placeholder="Search"/>
        </div>
  );

}

export default Search;