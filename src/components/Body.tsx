import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Body(){
    const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);
    const [countryData, setCountryData] = useState<any[]>([]);

    useEffect(() => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            setUserLocation(position);
            fetchCountryData();
        });
        } else {
        console.log('Geolocation is not supported by this browser.');
        }
    }, []);

    const fetchCountryData = async () => {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            setCountryData(response.data);
        } catch (error) {
            console.error('Failed to fetch country data:', error);
        }
    };

    return (
        <div>
        {userLocation && (
            <p>
            Your current latitude is {userLocation.coords.latitude} and longitude is {userLocation.coords.longitude}.
            </p>
        )}
        <h2>Country Data</h2>
        <ul>
            {countryData.map((country: any, index) => (
            <li key={index}>{country.name.common}</li>
            ))}
        </ul>
        </div>
    );
};

