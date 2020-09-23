require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const Person = require("./models/person");
const PORT = process.env.PORT;

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

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

app.get("/api/persons", (req, res) => {
  Person.find({}).then((result) => {
    res.json(result);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) return res.json(person);
      res.status(404).end();
    })
    .catch((error) => next(error));
});

app.get("/api/info", (req, res) => {
  const timestamp = new Date();
  Person.find({}).then((result) => {
    const personsString = `Phonebook has info for ${result.length} people`;
    const body = `${personsString}\n${timestamp}`;
    res.send(body);
  });
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons/", (req, res) => {
  const { name, number } = req.body;
  if (!name) return res.status(400).send({ error: "name is missing" });
  if (!number) return res.status(400).send({ error: "number is missing" });
  //   if (checkNameExists(name))
  //   return res.status(400).send({ error: "name already exists" });
  const person = new Person({ name, number });
  person.save().then((entry) => res.json(entry));
});

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  const { name, number } = req.body;
  const person = { name, number };
  Person.findByIdAndUpdate(id, person, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => next(error));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
