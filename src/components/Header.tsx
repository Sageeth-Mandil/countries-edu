// Header.tsx
import React, { useState, useEffect } from 'react';
import { fetchCountryDetails } from './CountryDetails';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import CountryDetails from './Body';

const Header: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [countryDetails, setCountryDetails] = useState<any>(null);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchLocation = async () => {
        try {
            if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
                const data = await response.json();
                const countryName = data.countryName;
                setSearchQuery(countryName);
                const countryDetails = await fetchCountryDetails(countryName);
                setCountryDetails(countryDetails);
                setLoading(false); // Set loading to false once data is fetched
            });
            } else {
            console.error('Geolocation is not supported by this browser.');
            }
        } catch (error) {
            console.error('Error fetching location:', error);
            setLoading(false); // Set loading to false if there's an error
        }
        };

        fetchLocation();
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
                    <motion.div
                        className="card mb-3"
                        initial={{ opacity: 0, scale: 0.8 }} // Initial animation properties
                        animate={{ opacity: 1, scale: 1 }} // Animation properties on load
                        transition={{ duration: 0.5 }} // Animation duration
                    >
                        <div className="card-body text-center box">
                            {loading ? (
                                <p>loading ...</p>
                            ) : (
                                <>
                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="Type a country name..."
                                    value={searchQuery}
                                    onChange={handleChange}
                                />
                                {suggestions.length > 0 && (
                                    <ul className="list-group mb-3">
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
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Header;
