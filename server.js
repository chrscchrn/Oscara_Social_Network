const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;
const db = require("./models");
require("dotenv").config();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
});

//API ROUTES
app.post("/api/signup", (req, res) => {

  db.User.create({
    email: req.body.email,
    handle: req.body.handle,
    imageurl: req.body.imageurl,
    bio: req.body.bio,
  }).then((response) => {
      res.status(200);
  }).catch(err => {
      console.error(err);
  });
})

app.post("/api/login", (req, res) => {

  const user = {
    email: req.body.email,
    handle
  }

  console.log(user)
});

