import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { useSearchContext } from "./context/SearchContext"

function SearchForm() {

  return (
    <div className="search-form">
      <form className="search-form">
        <input
          className="input-field"
          type="text"
          placeholder="Enter book title"
        />
        <button type="submit" className="search-button">
          <FaSearch size={18} />
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
