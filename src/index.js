const express = require("express");
const { adminAuthentication } = require("./middlewares/adminAuth");

const app = express();

const users = [
  {
    id: 1,
    name: "shenu",
  },
  {
    id: 2,
    name: "Arif",
  },
  {
    id: 3,
    name: "Richu",
  },
  {
    id: 4,
    name: "Amal",
  },
];

//admin route
app.use(express.json());
app.use("/admin", adminAuthentication);

app.get("/admin", (req, res, next) => {
  console.log("get users");
  res.send(users);
});
app.post("/admin", (req, res, next) => {
  console.log("post request");
  const body = req.body;
  users.push(body);
  res.send(users);
});

app.put("/admin", (req, res, next) => {
  console.log("Update called");
  const body = req.body;
  const Index = users.findIndex((user) => user.id === body.id);
  if (!Index) {
    res.status(404).send("Not found");
  } else {
    users[Index] = body;
    res.send(users);
  }
});

app.delete("/admin", (req, res, next) => {
  console.log("delete called");
  const body = req.body;
  const findIndex = users.findIndex((user) => {
    return user.id === body.id;
  });
  if (findIndex !== -1) {
    users.splice(findIndex, 1);
    res.send(users);
  }
});
app.listen(3000, () => console.log("server listnening to port 3000"));
