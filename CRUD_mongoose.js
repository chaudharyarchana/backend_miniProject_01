const express = require("express");

const userModel = require("./models/usermodel");

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("hii");
});

app.get("/create", async (req, res) => {
  let userCreated = await userModel.create([
    {
      name: "Archana",
      username: "Archana Kumari",
      age: 12,
    },
    {
      name: "Suman",
      username: "Suman Kumari",
      age: 12,
    },
  ]);
  res.send(userCreated);
});

app.get("/update", async (req, res) => {
  let updatedCreated = await userModel.findOneAndUpdate(
    {
      name: "Archana",
    },
    { username: "devbrat sinsinwar" },
    { new: true }
  );
  res.send(updatedCreated);
});

app.get("/read", async (req, res) => {
  let allUsers = await userModel.find();
  let archana = await userModel.find({ name: "Archana" }); // findOne returns object

  res.send(allUsers);
});

app.get("/delete", async (req, res) => {
  let deleted = await userModel.findOneAndDelete({ name: "Archana" }); // findOne returns object

  res.send(deleted);
});

app.listen(port);
