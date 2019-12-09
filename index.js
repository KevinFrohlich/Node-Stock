const express = require("express");
const app = express();
const path = require("path");
var exphbs = require("express-handlebars");

app.use(express.static(path.join(__dirname, "public")));

// view engine setup
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", function(req, res) {
  res.render("home");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server listening on Port: " + PORT));
