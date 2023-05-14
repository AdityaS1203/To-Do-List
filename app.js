require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL);


const taskSchema = new mongoose.Schema({
  name: String
});

const item = mongoose.model("item", taskSchema);

app.get("/", function (req, res) {
  item.find()
    .then((kaamKiList) => {
      const arr = [];
      for (var i = 0; i < kaamKiList.length; i++) {
        arr.push(kaamKiList[i].name);
      }
      res.render("list", { newlistitem: arr });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/", function (req, res) {
  var entered = req.body.task;
  const taskItem = new item({
    name: entered
  });
  if (entered.trim().length !== 0) {
    taskItem.save();
  }
  res.redirect("/");
});

app.get("/delete", function (req, res) {
  item.find()
    .then((kaamKiList) => {
      const arr = [];
      for (var i = 0; i < kaamKiList.length; i++) {
        arr.push(kaamKiList[i].name);
      }
      res.render("list", { newlistitem: arr });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/delete", function (req, res) {
  const btnNo = req.body.btn;
  item.find()
    .then((kaamKiList) => {
      const a = [];
      for (var i = 0; i < kaamKiList.length; i++) {
        a.push(kaamKiList[i].name);
      }
      var naam = a[btnNo];
      item.deleteOne({ name: naam })
        .then(() => {
          console.log("deletion successful");
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(PORT, function () {
  console.log("Server for to-do list is running");
});
