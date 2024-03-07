const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const { signup, login, protect } = require("./controllers/authControllers");
const globelErrorHandler = require("./controllers/errorControllers");

/******* middlewares ******/
// set view engine to ejs
app.set("view engine", "ejs");
// adds a middleware for serving static files to your Express app
app.use(express.static("public"));
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

/***** Routes ******/
app.get("/", (req, res) => {
  res.send("This is homepage");
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", login);
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.post("/signup", signup);
app.get("/secret", protect, (req, res) => {
  res.render("secret");
});

app.use(globelErrorHandler);

module.exports = app;
