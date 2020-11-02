const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const data = require("./data.json");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());

app.post("/auth", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "admin" && password === "admin") {
    res.json({ authenticated: true });
  } else {
    res.status(401).send({ authenticated: false });
  }
});

app.get("/data", (req, res) => {
  let limit;
  let offset;

  if (req.query.limit) {
    limit = req.query.limit;
  } else {
    limit = 20;
  }

  if (req.query.offset) {
    offset = req.query.offset;
  } else {
    offset = 0;
  }

  res.send(data.slice(Number(offset), Number(limit) + Number(offset)));
});

app.listen(8888, () => {
  console.log("Creatory frontend assignment dev server is running :)");
});
