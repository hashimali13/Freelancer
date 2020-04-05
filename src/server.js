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
app.get("/userid/:id", db.searchUser);
app.get("/users", db.getUsers);
app.get("/getproject", db.getProjects);
app.post("/create", db.createUser);
app.get("/searchproject", db.searchProjects);
app.get("/seepost", db.seePost);
app.get("/getprofile/:id", db.getProfile);
app.get("/getjob/:id", db.getJob);
app.get("/getmessages/:id", db.getMessages);
app.post("/makepost/:id", db.makePost);
app.post("/sendmessage/:id", db.sendMessage);
app.get("/getreceiverid/:id", db.getReceiverId);
app.post("/editpost/:id", db.editPost);
app.post("/getusername/:id", db.getUsername);
app.get("/getfriend/:id", db.getFriend);
app.post("/addfriend/:id", db.addFriend);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
