App.js
// src/App.js
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';

const App = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Replace 'URL_TO_JSON_DATA' with the actual URL of your data
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div >
      <h1 class="container">Country Search</h1>
      <SearchBar countries={countries} />
    </div>
  );
};

export default App;
