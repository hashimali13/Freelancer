const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const db = require("./db");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Basic route." });
});

app.get("/authuser", db.authUser);
app.get("/userid/id", db.searchUser);
app.get("/users", db.getUsers);
app.get("/getproject", db.getProjects);
app.post("/create", db.createUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
