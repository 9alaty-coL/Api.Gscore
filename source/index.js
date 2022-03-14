require("dotenv").config();

const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

//  Enable CORS on Server
let cors = require("cors");
app.use(cors());

//router
const route = require("./routes/index");
route(app);

//database
const db = require("./config/db/db");
db();

app.listen(port, () => {
  console.log("App listening at port", port);
});
