import React, { useState } from 'react';
import '../components/SearchBar.css';


const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/search/`);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('API error:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <ul className="results-list">
        {results.map((item, index) => (
          <li key={index} className="result-item">
            {item.name || item.title || JSON.stringify(item)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;







