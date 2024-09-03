import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (input.startsWith('0x') && input.length === 42) {
      navigate(`/account/${input}`);
    } else if (input.startsWith('0x') && input.length === 66) {
      navigate(`/transaction/${input}`);
    } else {
      alert('請輸入有效 Account Address 或 Txn Hash');
    }
  };

  return (
    <div className="search-bar-container">
      <input 
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search by Address / Txn hash"
        className="search-bar-input"
      />
      <button 
        onClick={handleSearch}
        className="search-bar-button"
      >
        <img src="/search.svg" alt="Search" className="search-icon" />
      </button>
    </div>
  );
};

export default SearchBar;
