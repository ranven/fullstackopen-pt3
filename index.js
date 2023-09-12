require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { token } = require("morgan");
const cors = require("cors");
const app = express();
const Contact = require("./models/contact");
app.use(express.static("dist"));
app.use(express.json());
app.use(cors());
app.use(
  morgan(
    ":method :url :status :total-time[digits] :req[header] :response-time ms :postData"
  )
);
morgan.token("postData", function (req, res, param) {
  return JSON.stringify(req.body);
});

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`
  );
});

app.get("/api/persons", (req, res) => {
  Contact.find({}).then((contacts) => {
    console.log(contacts);
    res.json(contacts);
  });
});

app.get("/api/persons/:id", (req, res) => {
  Contact.findById(req.params.id).then((contact) => {
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).end();
    }
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: "name missing",
    });
  } else if (!body.number) {
    return res.status(400).json({
      error: "number missing",
    });
  } /* else if (persons.find((p) => p.name === body.name)) {
    return res.status(400).json({ error: "name must be unique" });
  } */
  const contact = new Contact({
    name: body.name,
    number: body.number,
  });
  contact.save().then((saved) => {
    res.json(saved);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
