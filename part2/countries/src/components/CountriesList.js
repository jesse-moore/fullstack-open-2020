import React, { useState } from "react";
import { Country } from "./";

export default ({ data, weatherData, setWeatherData }) => {
  const [showCountry, setShowCountry] = useState({});

  const handleShowCountry = ({ target }) => {
    const { name } = target;
    if (showCountry[name]) {
      return setShowCountry({ ...showCountry, [name]: false });
    } else {
      return setShowCountry({ ...showCountry, [name]: true });
    }
  };

  return (
    <div>
      {data.map((country) => {
        const { name } = country;
        return (
          <div key={name}>
            <div>
              {name}{" "}
              <button name={name} onClick={handleShowCountry}>
                show
              </button>
            </div>
            {showCountry[name] && (
              <Country
                data={country}
                setWeatherData={setWeatherData}
                weatherData={weatherData}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
