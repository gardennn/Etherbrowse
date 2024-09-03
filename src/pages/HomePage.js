import React from 'react';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-title-container">
        <img src="/block.svg" alt="Ethereum Logo" className="home-logo" />
        <h1 className="home-title">Etherbrowse</h1>
      </div>
      <SearchBar />
    </div>
  );
};

export default HomePage;
