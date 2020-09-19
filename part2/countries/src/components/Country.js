import React from "react";
import { Weather } from "./";

export default ({ data, setWeatherData, weatherData }) => {
  const { name, capital, population, languages, flag } = data;
  return (
    <div>
      <h1>{name}</h1>
      <div>capital {capital}</div>
      <div>population {population}</div>
      <h2>languages</h2>
      <ul>
        {languages.map(({ name: lName }) => (
          <li key={lName}>{lName}</li>
        ))}
      </ul>
      <img src={flag} style={{ width: "200px" }} />
      <Weather
        name={capital}
        setWeatherData={setWeatherData}
        weatherData={weatherData}
      />
    </div>
  );
};
