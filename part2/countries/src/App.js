import React, { useEffect, useState } from "react";
import axios from "axios";
import { Country, CountriesList } from "./components";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterInput, setFilterInput] = useState("germany");
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  const handleChange = ({ target }) => {
    setFilterInput(target.value);
  };

  const handleFilter = ({ name }) => {
    if (filterInput === "") return false;
    if (name.toLowerCase().includes(filterInput.toLowerCase())) return true;
    return false;
  };

  const filteredCountries = countries.filter(handleFilter);
  const numCountries = filteredCountries.length;
  return (
    <div className="App" style={{ padding: "20px" }}>
      <div>
        find countries <input onChange={handleChange} value={filterInput} />
      </div>
      {numCountries === 0 && null}
      {numCountries === 1 && (
        <Country
          data={filteredCountries[0]}
          setWeatherData={setWeatherData}
          weatherData={weatherData}
        />
      )}
      {numCountries <= 10 && numCountries > 1 && (
        <CountriesList
          data={filteredCountries}
          setWeatherData={setWeatherData}
          weatherData={weatherData}
        />
      )}
      {numCountries > 10 && <div>Too many matches, specify another filter</div>}
    </div>
  );
};

export default App;
