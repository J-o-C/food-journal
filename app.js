require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

mongoose.connect(process.env.DB_URL);

app.get("/", async (req, res) => {
  res.send("Working");
});

app.listen(3000, function() {
  console.log("Server up and running on port 3000");
})
