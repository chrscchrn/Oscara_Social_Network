const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;
const db = require("./models");
require("dotenv").config();
const fs = require("fs");
const multer = require('multer');
// var upload = multer({ dest: 'uploads/' }) 

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('uploads'));


//API ROUTES ============================================================= API ROUTES
//Add user to the database
//dont forget to trim user details
app.post("/api/adduser", (req, res) => {
  console.log(req.body);
  db.User.create({
    email: req.body.email,
    handle: req.body.handle,
    imageurl: req.body.imageurl,
    bio: req.body.bio,
    location: req.body.location
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
// app.put("/api/signup", (req, res) => {

// });

//New Post.....GET USER ID FROM SEQUELIZE TO POST 
app.post("/api/post", (req, res) => {
  db.Post.create({
    body: req.body.body,
    likeCount: req.body.likeCount,
    commentCount: req.body.commentCount,
    UserId: req.body.UserId,
    handle: req.body.handle
  }).then((response) => {
    res.json(response);
    console.log(response)
  }).catch(err => console.log(err));
});

//Get Posts
app.get("/api/posts", (req, res) => {
  db.Post.findAll({
    order: [ ['createdAt', 'DESC'] ]
  })
  .then(posts => {
    res.json(posts);
  }).catch(err => console.log(err));
});

//Image Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

const uploads = multer({ storage });
app.post('/api/images', uploads.single('image'), async (req, res) => {
  const image = req.file.path;
  console.log(uploads, "|||", image)
  res.json({ message: 'image successfully created' });
})

app.get("/api/images", (req, res) => {
  const uploadsDirectory = path.join('uploads');
  fs.readdir(uploadsDirectory, (err, files) => {
    if (err) return res.json( { message: err});
    if(files.length === 0) return res.json( { message: 'No Images Uploaded!'} );
    return res.json({ files });
  })
});

app.get("*", (req, res) => {
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
