const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;
const db = require("./models");
require("dotenv").config();
const fs = require("fs");
const multer = require('multer');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('uploads'));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//API ROUTES ============================================================= API ROUTES
//dont forget to trim user details
app.post("/api/adduser", (req, res) => {
  console.log(req.body);
  db.User.create({
    email: req.body.email,
    handle: req.body.handle,
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
  db.User.findOne({ 
    where: { email: req.params.email } 
  }).then((dbUser) => {
    res.json(dbUser);
  }).catch(err => {
    console.log(err);
    res.status(500);
    res.json(err);
  });
});

//New Post
app.post("/api/post", (req, res) => {
  db.Post.create({
    body: req.body.body,
    likeCount: req.body.likeCount,
    UserId: req.body.UserId,
    handle: req.body.handle,
    image: req.body.image
  }).then((response) => {
    res.json(response);
  }).catch(err => console.log(err));
});

//========================================================================== TEMP
//like Post
app.get("/api/post/like/:id/:handle", (req, res) => {
  let postData = {};
  db.Post.findOne({
    where: {
      id: req.params.id
    }
  }).then( response => {
    if (response.dataValues) {
      postData = response.dataValues;
      db.Like.findOne({
        where: {
          PostId: req.params.id,
          handle: req.params.handle,
        }
      }).then( data => {
        if (!data) {
          db.Like.create({
            PostId: req.params.id,
            handle: req.params.handle,
          }).success(result => {
            postData.likeCount += 1;
            console.log(postData);
            db.Post.update({
              where: {
                id: req.params.id
              },
            },
            {
              likeCount: postData.likeCount
            })
          }).catch( err => {
            console.log(err);
            res.status(500);
            res.json(err);
          })
        } else {
          res.status(400).json({ error: 'Post already liked'});
        }
      }).catch(err => {
        console.log(err);
        res.status(500);
        res.json(err);
      })
    } else {
      res.status(404).json({ error: 'Post not found' })
    }
  }).catch(err => {
    console.log(err);
    res.status(500);
    res.json(err);
  })
});

//==========================================================================  TEMP

//Get All Posts  LIMIT EVENTUALLY
app.get("/api/posts", (req, res) => {
  db.Post.findAll({
    order: [ ['createdAt', 'DESC'] ]
  })
  .then(posts => {
    res.json(posts);
  }).catch(err => {
    console.log(err);
    res.status(500);
    res.json(err);
  });
});

//Get user posts
app.get("/api/posts/:email", (req, res) => {
  console.log(req.params.email);
  db.Post.findAll({
    where: {
      UserId: req.params.email
    },
    order: [ ['createdAt', 'DESC'] ]
  })
  .then(posts => {
    res.json(posts);
  }).catch(err => {
    console.log(err);
    res.status(500);
    res.json(err);
  });
});

//Image storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

//yeah we uploading photos
const uploads = multer({ storage });
app.post('/api/image/:email', uploads.single('image'), async (req, res) => {
  const image = req.file.path;
  let imageData; 
  try {
    imageData = fs.readFileSync(__dirname + "\/" + image);
  } catch (error) {
    console.log(error);
  }

  if (imageData) {
    db.Image.create({
      type: req.file.mimetype,
      name: req.file.originalname, 
      UserId: req.params.email,
      data: imageData,
    }).then((img) => {
      try {
        fs.writeFileSync( __dirname + "\/" + image, img.data);  
        res.json({ message: 'image successfully created' });
      } catch (error) {
        console.log(error);
        res.json(error);
      }
    }).catch(err => {
      console.log(err);
      res.status(500);
      res.json(err);
    });
  }
});

//preview images
app.get("/api/images", (req, res) => {
  const uploadsDirectory = path.join('uploads');
  fs.readdir(uploadsDirectory, (err, files) => {
    if (err) return res.json( { message: err});
    if(files.length === 0) return res.json( { message: 'No Images Uploaded!'} );
    return res.json({ files });
  })
});

//get single image, might be useless...
app.get("/api/user/image/:email", (req, res) => {
  db.Image.findOne({
    where: { UserId: req.params.email }
  }).then(blob => {
    fs.writeFileSync( __dirname + "/uploads/user/" + blob.name, blob.data);
    let name = blob.dataValues.name;
    const userUploadsDirectory = path.join('uploads/user');
    fs.readdir(userUploadsDirectory, (err, files) => {
      if (err) return res.json({ message: err });
      if (files.length === 0) return res.json({ message: 'No Images Uploaded!' });
      return res.json({ 
        data: files, 
        fileName: name 
      });
    })
  }).catch(err => {
    console.log(err);
    res.status(500);
    res.json(err);
  });
});

//get ALL images and write them to the uploads dir
app.get("/api/images/all", (req, res) => {
  db.Image.findAll({})
    .then(blob => {
      const userUploadsDirectory = path.join('uploads');
      fs.readdir(userUploadsDirectory, (err, files) => {
        if (err) return res.json({ message: err });
        if (files.length < blob.length) {
          for (let i = 0; i < blob.length; i++) {
            fs.writeFileSync( __dirname + "/uploads/" + blob[i].dataValues.name, blob[i].dataValues.data);
          }
        }
        return res.json({ data: files });
      })
  }).catch(err => {
    console.log(err);
    res.status(500);
    res.json(err);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
});