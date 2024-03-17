// countryDetails.ts
import axios from 'axios';

export const fetchCountryDetails = async (countryName: string) => {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch country details:', error);
        return null;
    }
};
