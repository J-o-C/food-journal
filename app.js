require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date");



const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true})
.then(console.log("Database connected"))
.catch((err) => console.log(err));

const feelingSchema = new mongoose.Schema({
  time: [Number],
  description: String
});

const foodSchema = new mongoose.Schema({
  time: [Number],
  description: String
});

const daySchema = new mongoose.Schema({
  month: Number,
  day: Number,
  year: Number,
  feelings: [feelingSchema],
  foods: [foodSchema]
});

const Day = mongoose.model("Day", daySchema);

app.get("/", async (req, res) => {
  res.render("home");
});



app.listen(3000, function() {
  console.log("Server up and running on port 3000");
})
