const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const request = require("request");

const PORT = process.env.PORT || 5000;
// API Token: pk_e95c28451060417dba76769b63faf5af
// Create call API function
function callApi(finishedApi) {
  request(
    "https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_e95c28451060417dba76769b63faf5af",
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      if (res.statusCode === 200) {
        finishedApi(body);
      }
    }
  );
}

// view engine setup
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Set handlebar routes
app.get("/", function(req, res) {
  callApi(function(doneApi) {
    res.render("home", {
      stock: doneApi
    });
  });
});

app.get("/about.html", function(req, res) {
  res.render("about");
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log("Server listening on Port: " + PORT));
