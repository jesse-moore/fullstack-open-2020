import React, { useState, useEffect } from "react";
import { phonebookService } from "./services";
import { Filter, Message, PersonForm, PersonsList } from "./components";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [appMessage, setAppMessage] = useState({ message: "", type: "" });

  useEffect(() => {
    phonebookService
      .getPhoneBook()
      .then((data) => setPersons(data))
      .catch(() => {
        handleMessage(
          `Cannot retrieve phonebook database from server`,
          "alert"
        );
      });
  }, []);

  const checkNameExists = () => {
    return persons.filter((person) => (person.name === newName ? true : false))
      .length > 0
      ? true
      : false;
  };

  const alertNameExists = () => {
    return window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    );
  };

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    if (name === "name") return setNewName(value);
    if (name === "number") return setNewPhoneNumber(value);
    if (name === "filter") return setNewFilter(value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (checkNameExists()) return handleUpdate();
    return handleAdd();
  };

  const handleAdd = () => {
    const id = persons.length + 1;
    const newPerson = { name: newName, number: newPhoneNumber, id };
    phonebookService
      .addEntry(newPerson)
      .then((p) => {
        console.log(p.message);
        setPersons([p, ...persons]);
        setNewName("");
        setNewPhoneNumber("");
        handleMessage(`Added ${p.name}`, "notif");
      })
      .catch((error) => {
        const errorMessage = error.response && error.response.data.error;
        if (errorMessage)
          return handleMessage(
            `Error adding ${newPerson.name}: ${errorMessage}`,
            "alert"
          );
        handleMessage(`Error adding ${newPerson.name}`, "alert");
      });
  };

  const handleUpdate = () => {
    if (!alertNameExists()) return;
    const person = persons.filter((p) => p.name === newName)[0];
    const updatedPerson = { ...person, number: newPhoneNumber };
    phonebookService
      .updateEntry(updatedPerson)
      .then((personData) => {
        const newPersons = persons.map((p) => {
          return p.name === personData.name ? personData : p;
        });
        setPersons(newPersons);
        setNewName("");
        setNewPhoneNumber("");
        handleMessage(`Updated ${person.name}`, "notif");
      })
      .catch((error) => {
        const errorMessage = error.response && error.response.data.error;
        if (errorMessage) return handleMessage(errorMessage, "alert");
        handleMessage(
          `${person.name} already removed from server and cannot be updated`,
          "alert"
        );
      });
  };

  const handleDelete = ({ target }) => {
    const { name: id } = target;
    const { name: personName } = persons.filter(
      (person) => person.id === id
    )[0];
    const confirmDelete = window.confirm(`Delete ${personName}?`);
    if (!confirmDelete) return;
    phonebookService
      .deleteEntry(id)
      .then(() => {
        const newPersons = persons.filter((p) => p.id !== id);
        setPersons(newPersons);
        handleMessage(`Deleted ${personName}`, "notif");
      })
      .catch(() => {
        handleMessage(`Error deleting ${personName}`, "alert");
      });
  };

  const handleMessage = (message, type) => {
    setAppMessage({ message, type });
    setTimeout(() => {
      setAppMessage({});
    }, 5000);
  };

  const personsFilter = ({ name }) => {
    if (name.toLowerCase().includes(newFilter.toLowerCase())) return true;
    return false;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Message appMessage={appMessage} />
      <Filter handleOnChange={handleOnChange} newFilter={newFilter} />
      <h2>add a new</h2>
      <PersonForm
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        newName={newName}
        newPhoneNumber={newPhoneNumber}
      />
      <h2>Numbers</h2>
      <PersonsList
        persons={persons}
        personsFilter={personsFilter}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
