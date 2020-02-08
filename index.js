const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 5000;

// view engine setup
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Set handlebar routes
app.get("/", function(req, res) {
  res.render("home");
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log("Server listening on Port: " + PORT));
