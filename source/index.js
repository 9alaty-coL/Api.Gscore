require("dotenv").config();

const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

//  Enable CORS on Server
app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

//router
const route = require("./routes/index");
route(app);

//database
const db = require("./config/db/db");
db();

app.listen(port, () => {
  console.log("App listening at port", port);
});
