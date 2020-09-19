import React, { useEffect } from "react";
import axios from "axios";

export default ({ name, setWeatherData, weatherData }) => {
  useEffect(() => {
    if (weatherData[name] && !weatherData[name].error) return;
    const key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${key}&query=${name}`
      )
      .then(({ data }) => {
        const {
          temperature,
          weather_icons,
          wind_speed,
          wind_dir,
        } = data.current;
        setWeatherData({
          ...weatherData,
          [name]: { temperature, weather_icons, wind_speed, wind_dir },
        });
      })
      .catch((error) => {
        setWeatherData({
          ...weatherData,
          [name]: { error },
        });
      });
  }, []);

  if (!weatherData[name]) return <div>Retrieving weather data</div>;
  const { temperature, weather_icons, wind_speed, wind_dir } = weatherData[
    name
  ];
  return (
    <div>
      <h2>Weather in {name}</h2>
      <div>
        <span style={{ fontWeight: "bold" }}>temperature: </span>
        <span>{temperature} </span>
        <span>Celcius</span>
      </div>
      <div>
        <img src={weather_icons[0]} style={{ width: "50px" }} />
      </div>
      <div>
        <span style={{ fontWeight: "bold" }}>wind: </span>
        <span>{wind_speed} mph </span>
        <span>direction </span>
        <span>{wind_dir}</span>
      </div>
    </div>
  );
};
