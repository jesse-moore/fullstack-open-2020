import React, { useState, useEffect } from "react";
import axios from "axios";
import { Filter, PersonForm, PersonsList } from "./components";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      setPersons(res.data);
    });
  }, []);

  const checkNameExists = () => {
    return persons.filter((person) => (person.name === newName ? true : false))
      .length > 0
      ? true
      : false;
  };

  const alertNameExists = () => {
    window.alert(`${newName} is already added to phonebook`);
  };

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    if (name === "name") return setNewName(value);
    if (name === "number") return setNewPhoneNumber(value);
    if (name === "filter") return setNewFilter(value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (checkNameExists()) return alertNameExists();
    setPersons([{ name: newName, number: newPhoneNumber }, ...persons]);
    setNewName("");
    setNewPhoneNumber("");
  };

  const personsFilter = ({ name }) => {
    if (name.toLowerCase().includes(newFilter.toLowerCase())) return true;
    return false;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleOnChange={handleOnChange} newFilter={newFilter} />
      <h2>add a new</h2>
      <PersonForm
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        newName={newName}
        newPhoneNumber={newPhoneNumber}
      />
      <h2>Numbers</h2>
      <PersonsList persons={persons} personsFilter={personsFilter} />
    </div>
  );
};

export default App;
