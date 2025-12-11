const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("I am from server");
});

app.get("/about", (req, res) => {
  res.send("I am from about");
});

app.get("/Home", (req, res) => {
  res.send("I am from Home");
});
app.post("/user", (req, res) => {
  const { name, place } = req.query;
  res.send({ name, place });
});
app.post("/user/:id/:name/:place", (req, res) => {
  const { id, name, place } = req.params;
  res.send({ id, name, place });
});
app.listen(3000, () => console.log("Server is listening to port 3000"));
