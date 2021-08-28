import React from "react";
import "./SearchNotFound.css";

const SearchNotFound = () => <div className="search-not-found-container">
  <div className="search-not-found-bold-text">
    No Results Found
  </div>
  <div className="search-not-found-text">
    We did not find any article that matches this search
    Make sure that the search text is entered correctly
    Try using other search criteria
  </div>
</div>;

export default SearchNotFound;
