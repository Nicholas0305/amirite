import React from 'react'
function SearchBar({search,updateSearch}){
  
    return(
        <input placeholder='search' id='searchbar' value={search} onChange={updateSearch}></input>
    )
}
export default SearchBar;