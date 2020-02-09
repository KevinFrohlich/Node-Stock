const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const request = require("request");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

// Use body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// API Token: pk_e95c28451060417dba76769b63faf5af
// Create call API function
function callApi(finishedApi, ticker) {
  request(
    "https://cloud.iexapis.com/stable/stock/" +
      ticker +
      "/quote?token=pk_e95c28451060417dba76769b63faf5af",
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

// Set handlebar index GET route
app.get("/", function(req, res) {
  callApi(function(doneApi) {
    res.render("home", {
      stock: doneApi
    });
  }, "fb");
});

// Set handlebar index POST route
app.post("/", function(req, res) {
  callApi(function(doneApi) {
    //posted_info = req.body.stockTicker;
    res.render("home", {
      stock: doneApi
    });
  }, req.body.stockTicker);
});

app.get("/about.html", function(req, res) {
  res.render("about");
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log("Server listening on Port: " + PORT));
