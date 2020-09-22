const express = require("express");
const morgan = require("morgan");
const app = express();
const phonebook = require("./phonebook");

app.use(express.json());
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.body(req, res),
    ].join(" ");
  })
);
app.use(express.static("build"));

app.get("/api/persons", (req, res) => {
  res.json(phonebook.persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const entry = phonebook.persons.find(
    (person) => person.id === Number.parseInt(id)
  );
  if (entry) return res.json(entry);
  res.status(404).end();
});

app.get("/api/info", (req, res) => {
  const timestamp = new Date();
  const numPersons = phonebook.persons.length;
  const personsString = `Phonebook has info for ${numPersons} people`;
  const body = `${personsString}\n${timestamp}`;
  res.send(body);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const entry = phonebook.persons.find(
    (person) => person.id === Number.parseInt(id)
  );
  if (entry) {
    deleteEntry(id);
    return res.status(204).end();
  }
  res.status(404).end();
});

app.post("/api/persons/", (req, res) => {
  const { name, number } = req.body;
  if (!name) return res.status(400).send({ error: "name is missing" });
  if (!number) return res.status(400).send({ error: "number is missing" });
  if (checkNameExists(name))
    return res.status(400).send({ error: "name already exists" });
  const id = Math.floor(Math.random() * 100000);
  const entry = { id, name, number };
  addEntry(entry);
  res.json(entry);
});

function addEntry(entry) {
  const { persons } = phonebook;
  const newPersons = [...persons, entry];
  phonebook.persons = newPersons;
}

function deleteEntry(entryID) {
  const { persons } = phonebook;
  const newPersons = persons.filter(({ id }) => {
    return id !== Number.parseInt(entryID);
  });
  phonebook.persons = newPersons;
}

function checkNameExists(name) {
  const check = phonebook.persons.findIndex((person) => person.name === name);
  return check === -1 ? false : true;
}

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
