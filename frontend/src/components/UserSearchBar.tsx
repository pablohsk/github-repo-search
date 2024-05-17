import React, { useState } from 'react';

interface UserSearchBarProps {
  onSearch: (query: string) => void;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const UserSearchBar: React.FC<UserSearchBarProps> = ({ onSearch, setSearchQuery }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSearchQuery(e.target.value); // Defina a query também no estado do componente pai, se necessário
        }}
        placeholder="Search GitHub users..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default UserSearchBar;