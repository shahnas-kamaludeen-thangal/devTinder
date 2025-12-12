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
  try {
    console.log("get users");
    res.send(users);
  } catch (err) {
    res.status(500).send("Something happend wrong");
  }
});
app.post("/admin", (req, res, next) => {
  try {
    console.log("post request");
    const body = req.body;
    users.push(body);
    res.send(users);
  } catch (err) {
    res.status(500).send("Something happend wrong");
  }
});

app.put("/admin", (req, res, next) => {
  try {
    console.log("Update called");
    const body = req.body;
    const Index = users.findIndex((user) => user.id === body.id);
    if (Index === -1) {
      console.log("No user avilable");
      next(new Error("User Not Found"));
    } else {
      users[Index] = body;
      res.send(users);
    }
  } catch (error) {
    res.status(500).send("Something happend wrong");
  }
});

app.delete("/admin", (req, res, next) => {
  try {
    console.log("delete called");
    const body = req.body;
    const findIndex = users.findIndex((user) => {
      return user.id === body.id;
    });
    if (findIndex !== -1) {
      users.splice(findIndex, 1);
      res.send(users);
    } else {
      next(new Error("User not found"));
    }
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: err.message || "Error happend " });
});
app.listen(3000, () => console.log("server listnening to port 3000"));
