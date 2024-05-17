import React, { useState } from 'react';

const UserSearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search GitHub users..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default UserSearchBar;