import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Search by title, author, or genre"
      />
    </div>
  );
};

export default SearchBar;
