const express = require("express");
const app = express();
const phonebook = require("./phonebook");
let notes = [];

app.get("/api/persons", (req, res) => {
  res.json(phonebook);
});

app.get("/api/info", (req, res) => {
  const timestamp = new Date();
  const numPersons = phonebook.persons.length;
  const personsString = `Phonebook has info for ${numPersons} people`;
  const body = `${personsString}\n${timestamp}`;
  res.send(body);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
