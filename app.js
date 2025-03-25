const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const loginSchema = require("./models/login");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname); // get the file extension
    cb(null, Date.now() + extension); // Add the extension back to the filename
  },
});

const upload = multer({ storage: storage });

const saltRounds = 10;

const app = express();
const port = 5000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.cookie("hii", "hii");
  res.render("createUserForLogin.ejs");
});

app.get("/multer", (req, res) => {
  res.render("multer.ejs");
});

app.post("/multer", upload.single("avatar"), (req, res) => {
  console.log(req.file);
  res.send("done");
});

app.post("/create", async (req, res) => {
  const userExistes = await loginSchema.find({
    email: req.body.email,
  });
  if (userExistes.length) {
    res.send("something went wrong");
  } else {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(req.body.password, salt, async function (err, hash) {
        await loginSchema.create({
          email: req.body.email,
          password: hash,
        });
        var token = jwt.sign({ email: req.body.email }, "shhhhh");
        res.cookie("token", token);
        res.send("done");
      });
    });
  }
});

app.listen(port);
