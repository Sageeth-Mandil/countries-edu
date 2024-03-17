// CountryDetails.tsx
import React from 'react';

interface CountryDetailsProps {
    country: any; // Replace 'any' with the type of your country details
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ country }) => {
    if (!country) {
        return null;
    }

    const { name, capital, population, languages, flags } = country[0];

    return (
        <div className="card mt-4">
            <img src={flags.svg} className="card-img-top" alt={`${name.common} Flag`} style={{ height: '300px', objectFit: 'contain' }} />
            <div className="card-body">
                <h5 className="card-title text-center mb-4">{name.common}</h5>
                <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Capital:</strong> {capital}</li>
                <li className="list-group-item"><strong>Population:</strong> {population}</li>
                <li className="list-group-item"><strong>Languages:</strong> {Object.values(languages).join(', ')}</li>
                </ul>
            </div>
        </div>
    );
};

export default CountryDetails;
