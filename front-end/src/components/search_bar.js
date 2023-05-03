import React from 'react';
import '../styles/search_bar.css';


const SearchBar = ({ handleSearchChange }) => {
 return (
   <div className="search-bar-container">
     <input
       type="text"
       placeholder="Search"
       onChange={handleSearchChange}
       className="search-bar-input"
     />
   </div>
 );
};


export default SearchBar;
