// CountryDetails.tsx
import React from 'react';

interface CountryDetailsProps {
  country: any; // Replace 'any' with the type of your country details
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ country }) => {
  if (!country) {
    return <div>No country details available</div>;
  }

  const { name, capital, population, languages, flags } = country[0];

  return (
    <div className="container mt-4">
      <h2>Country Details</h2>
      <div>
        <img src={flags.svg} alt={`${name.common} Flag`} style={{ width: '100px' }} />
      </div>
      <div>
        <strong>Name:</strong> {name.common}
      </div>
      <div>
        <strong>Capital:</strong> {capital}
      </div>
      <div>
        <strong>Population:</strong> {population}
      </div>
      <div>
        <strong>Languages:</strong>{' '}
        {Object.values(languages)
          .map((language: any) => language)
          .join(', ')}
      </div>
    </div>
  );
};

export default CountryDetails;
