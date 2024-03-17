// Header.tsx
import React, { useState } from 'react';
import { fetchCountryDetails } from './CountryDetails';
import CountryDetails from './Body';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [countryDetails, setCountryDetails] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchSuggestions = async (query: string) => {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${query}`);
        const data = await response.json();
        const countryNames = data.map((country: any) => country.name.common);
        setSuggestions(countryNames);
      } catch (error) {
        console.error('Failed to fetch country suggestions:', error);
        setSuggestions([]);
      }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
    if (value.trim() === '') {
      setSuggestions([]);
    } else {
      fetchSuggestions(value);
    }
  };
  

  const handleSelect = async (country: string) => {
    setSearchQuery(country);
    setSuggestions([]);
    const countryDetails = await fetchCountryDetails(country);
    setCountryDetails(countryDetails);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Search for a Country</h1>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Type a country name..."
          value={searchQuery}
          onChange={handleChange}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" type="button">
            Search
          </button>
        </div>
      </div>
      {suggestions.length > 0 && (
        <ul className="list-group mt-2">
          {suggestions.map((country, index) => (
            <li
              key={index}
              className="list-group-item list-group-item-action"
              onClick={() => handleSelect(country)}
            >
              {country}
            </li>
          ))}
        </ul>
      )}
      <CountryDetails country={countryDetails} />
    </div>
  );
};

export default Header;
