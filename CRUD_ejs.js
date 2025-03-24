const express = require("express");
const path = require("path");

const userModel = require("./models/user");

const app = express();
const port = 5000;

// form parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// public files
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  let allUsers = await userModel.find();
  res.render("index.ejs", { users: allUsers });
});

app.post("/create", async (req, res) => {
  await userModel.create({
    name: req.body.name,
    email: req.body.email,
  });
  res.redirect("/");
});

app.get("/delete/:id", async (req, res) => {
  await userModel.findOneAndDelete({
    _id: req.params.id.toString(),
  });
  res.redirect("/");
});

app.get("/edit/:id", async (req, res) => {
  let user = await userModel.findOne({
    _id: req.params.id,
  });
  res.render("edit.ejs", { user: user });
});

app.post("/update/:id", async (req, res) => {
  let user = await userModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      name: req.body.name,
      email: req.body.email,
    },
    { new: true }
  );
  console.log(user);

  res.redirect("/");
});

app.listen(port);
