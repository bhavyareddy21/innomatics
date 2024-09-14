SearchBar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
      .catch(error => console.error('Error fetching the data:', error));
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = countries.filter(country =>
        (country.name.common && country.name.common.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (country.capital && country.capital[0].toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, countries]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for countries or capitals..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((country, index) => (
            <li key={index}>
              {country.name.common} - {country.capital ? country.capital[0] : 'No capital'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
