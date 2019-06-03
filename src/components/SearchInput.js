import React from "react";

const SearchInput = () => {
  return (
    <div className="card-header">
      <div className="input-group">
        <input
          type="text"
          placeholder="Search..."
          name=""
          className="form-control search"
        />
        <div className="input-group-prepend">
          <span className="input-group-text search_btn">
            <i className="fas fa-search" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
