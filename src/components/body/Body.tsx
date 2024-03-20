// CountryDetails.tsx
import React from 'react';
import background from './../../assets/container-img.png' 
import './Body.css'

interface CountryDetailsProps {
    country: any; // Replace 'any' with the type of your country details
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ country }) => {
    if (!country) {
        return null;
    }

    const {name,capital,population,languages,flags,region,area,currencies,idd,timezones,continents,subregion } = country[0];

    return (
        <div className="container" >
            <div className="card mt-4" id="img" style={{ backgroundImage: `url(${background})` }}>
                
                <img src={flags.svg} className="card-img-top" alt={`${name.common} Flag`} style={{ height: '300px', objectFit: 'contain' }} />
                <div className="card-body">
                    <h5 className="card-title text-center mb-4">{name.common}</h5>

                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>Capital:</strong> {capital}</li>
                        <li className="list-group-item"><strong>Population:</strong> {population}</li>
                        <li className="list-group-item"><strong>Languages:</strong> {Object.values(languages).join(', ')}</li>
                        <li className="list-group-item"><strong>Currencies:</strong> {Object.values(currencies).join(', ')}</li>
                        <li className="list-group-item"><strong>IDD:</strong> {Object.values(idd)}</li>
                        <li className="list-group-item"><strong>Region:</strong> {region}</li>
                        <li className="list-group-item"><strong>Subregion:</strong> {subregion}</li>
                        <li className="list-group-item"><strong>Continents:</strong> {continents}</li>
                        <li className="list-group-item"><strong>Area:</strong> {area}</li>
                        <li className="list-group-item"><strong>Timezones:</strong> {timezones}</li>


                    {/* <ul className="list-group list-group-flush"> */}
                        {/* <h2>{country.name.common}</h2>
                        <p>Capital: {country.capital}</p>
                        <p>Region: {country.region}</p>
                        <p>Population: {country.population}</p>
                        <p>Area: {country.area} km<sup>2</sup></p> */}
                        {/* <p>Languages: {Object.values(country.languages).join(', ')}</p>
                        <p>Currencies: {Object.values(country.currencies).join(', ')}</p> */}
                        {/* <div className="photo-input">
                            <label htmlFor="file">Upload photo:</label>
                            <input type="file" id="file" name="file" accept="image/*"/>
                        </div> */}
                        {/* </ul> */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CountryDetails;
