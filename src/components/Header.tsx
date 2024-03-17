// Header.tsx
import React, { useState, useEffect } from 'react';
import { fetchCountryDetails } from './CountryDetails';
import CountryDetails from './Body';

const Header: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [countryDetails, setCountryDetails] = useState<any>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
            const data = await response.json();
            const countryName = data.countryName;
            setSearchQuery(countryName);
            const countryDetails = await fetchCountryDetails(countryName);
            setCountryDetails(countryDetails);
        });
        } else {
        console.error('Geolocation is not supported by this browser.');
        }
    }, []);

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
        <div className="container my-4">
        <div className="row">
            <div className="col-lg-8 offset-lg-2">
            <h1 className="text-center mb-4 display-4 fw-bold">Explore Countries</h1>
            <div className="input-group mb-3">
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
                <ul className="list-group">
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
            </div>
        </div>
        <div className="row">
            <div className="col-lg-8 offset-lg-2">
            <CountryDetails country={countryDetails} />
            </div>
        </div>
        </div>
    );
};

export default Header;
