require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date");

const app = express();

let fields = 1;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true})
.then(console.log("Database connected"))
.catch((err) => console.log(err));

const feelingSchema = new mongoose.Schema({
  time: [Number],
  description: String,
  state: String
});

const foodSchema = new mongoose.Schema({
  time: [Number],
  food: [String]
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
  res.render("home", {Title: "Food Journal"});
});

app.get("/food-entry", async (req, res) => {

  res.render("food", {Title: "Entry new Food", fields: fields});
});

app.get("/add-field", function (req, res)  {
  fields += 1;
  res.redirect("/food-entry");
});

app.get("/delete-field", function (req, res)  {
  if (fields != 1) {
    fields -= 1;
  }

  res.redirect("/food-entry");
});

app.get("/feeling-entry", function(req, res) {
  res.render("feeling", {Title: "Entry new feeling"});
})

app.post("/food", async (req, res) => {
  const time = date.getTime();
  const {thisYear, thisMonth, today} = date.getDate();


  const data = {
    time: time,
    food: req.body.food
  }

  const dayFound = await Day.findOne({day: today, month: thisMonth, year: thisYear});

  if (dayFound) {

    dayFound.foods.push(data);
    dayFound.save();

  } else {

    const day = new Day({
      day: today,
      month: thisMonth,
      year: thisYear,
      foods: data
    });

    day.save();
  }

  fields = 1;
  res.redirect("/");

});

app.post("/feeling", async (req, res) => {

  const time = date.getTime();
  const {thisYear, thisMonth, today} = date.getDate();

  const data = {
    time: time,
    description: req.body.description,
    state: req.body.state
  }

  const dayFound = await Day.findOne({day: today, month: thisMonth, year: thisYear});

  if (dayFound) {
    dayFound.feelings.push(data);
    dayFound.save();
  } else {
    const day = new Day({
      day: today,
      month: thisMonth,
      year: thisYear,
      feelings: data
    });

    day.save();
  }

  res.redirect("/");

});


app.listen(3000, function() {
  console.log("Server up and running on port 3000");
})
