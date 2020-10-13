const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;
const db = require("./models");
require("dotenv").config();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//API ROUTES ============================================================= API ROUTES
//Add user to the database
//dont forget to trim user details
app.post("/api/adduser", (req, res) => {
  console.log(req.params, req.query);
  db.User.create({
    email: req.body.email,
    handle: req.body.handle,
    imageurl: req.body.imageurl,
    bio: req.body.bio,
  }).then((response) => {
      res.status(200);
      console.log(response);
  }).catch(err => {
      console.error(err);
  });
})

//get single user to check if they are new
app.get("/api/user/:email", (req, res) => {
  console.log(req.params.email);
  db.User.findOne({ 
    where: { email: req.params.email } 
  }).then((dbUser) => {
    res.json(dbUser);
  });
});

//update user here
app.put("/api/signup", (req, res) => {

});

//New Post.....GET USER ID FROM SEQUELIZE TO POST 
app.post("/api/post", (req, res) => {
  console.log(req.body);
  db.Post.create({
    body: req.body.body,
    likeCount: req.body.likeCount,
    commentCount: req.body.commentCount,
    // UserId: req.body.email,
  }).then((response) => {
    res.json(response);
  }).catch(err => console.log(err));
});

//Get Posts
app.get("/api/posts", (req, res) => {
  db.Post.findAll({
    order: [ ['createdAt', 'DESC'] ]
  })
  .then(posts => {
    console.log(posts)
    res.json(posts);
  }).catch(err => console.log(err));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
});