import React from "react";
/*Main Page search component that allows users to search for chat rooms
Input is managed via react state, not Formik */
function SearchBar({ search, updateSearch }) {
  return (
    <input
      placeholder="search"
      id="searchbar"
      value={search}
      onChange={updateSearch}
    ></input>
  );
}
export default SearchBar;
