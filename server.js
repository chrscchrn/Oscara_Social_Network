const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;
const db = require("./models");
require("dotenv").config();
const fs = require("fs");
const multer = require('multer');

// ** del uploads before pushing to heroku **

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('uploads'));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//USER ROUTES ============================================================= USER ROUTES
app.post("/api/adduser", (req, res) => {
  db.User.create({
    email: req.body.email,
    handle: req.body.handle,
    bio: req.body.bio,
    location: req.body.location
  }).then((response) => {
    res.status(200);
  }).catch(err => {
    console.error(err);
    res.status(500).json({ error: 'add user error'});
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

//get single user by handle
app.get("/api/userhandle/:handle", (req, res) => {
  db.User.findOne({ 
    where: { handle: req.params.handle } 
  }).then((dbUser) => {
    console.log(dbUser)
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
    replyCount: req.body.replyCount,
    UserId: req.body.UserId,
    handle: req.body.handle,
    image: req.body.image
  }).then((response) => {
    res.json(response);
  }).catch(err => {
    console.log(err);
    res.status(500);
    res.json(err);
  });
});

//like Post ========================================================================== LIKES
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
          }).then( result => {
            postData.likeCount += 1;
            let values = { likeCount: postData.likeCount } 
            let selector = { where: { id: req.params.id } }
            db.Post.update(values, selector)
              .then( responseTwo => {
                res.json(responseTwo);
              }).catch(err => {
                console.log(err);
                res.status(500);
                res.json(err);
              });
          }).catch(err => {
            console.log(err);
            res.status(500);
            res.json(err);
          })
        } else {
          res.json({ error: 'Post already liked'});
          res.status(400);
        }
      }).catch(err => {
        console.log(err);
        res.json(err);
        res.status(500);
      })
    } else {
      res.json({ error: 'Post not found' })
      res.status(404)
    }
  }).catch(err => {
    console.log(err);
    res.json(err);
    res.status(500);
  })
});


//==========================================================================  reply to post
app.post("/api/reply", (req, res) => {
  let postData = {};
  db.Post.findOne({
    where: {
      id: req.body.postId,
    }
  }).then(postInfo => {
    postData = postInfo.dataValues;
    db.Reply.create({
      body: req.body.body,
      handle: req.body.handle,
      PostId: req.body.postId,
    })
    .then(response => {
      res.json(response); 
    }).then(() => {
      postData.replyCount += 1;
      let values = { replyCount: postData.replyCount } 
      let selector = { where: { id: req.body.postId } }
      db.Post.update(values, selector)
      .then(responseTwo => {
        res.json(responseTwo);
      }).catch(err => {
        console.log(err);
        res.status(500);
      });
    }).catch(err => {
      console.log(err);
      res.status(500);
      res.json(err);
    });
  }).catch(err => {
    console.log(err);
    res.status(500);
    res.json(err);
  })
});

//get a posts comments
app.get("/api/reply/:id", (req, res) => {
  db.Reply.findAll({
    where: {
      postId: req.params.id
    }
  }).then(resp => {
    res.json(resp);
  }).catch(err => {
    console.log(err);
    res.status(500);
    res.json(err);
  })
})

//Get All Posts 
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

//Get specific user posts
app.get("/api/posts/:email", (req, res) => {
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

//Delete post and associated replies
app.delete("/api/posts/:id", (req, res) => {
  db.Reply.destroy({
    where: {
      PostId: req.params.id,
    }
  }).then(dbReplies => {
    console.log(dbReplies);
    res.json(dbReplies);
    db.Post.destroy({
      where: {
        id: req.params.id,
      }
    }).then(dbPost => {
      console.log(dbPost);
      res.json(dbPost);
    }).catch(err => {
      console.log(err);
      res.status(400);
      res.json(err);
    })
  }).catch(err => {
    console.log(err);
    res.status(400);
    res.json(err);
  })
})

//Image storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

const uploads = multer({ storage });

app.post('/api/image/:email', uploads.single('image'), async (req, res) => {
  const image = req.file.path;
  let imageData; 
  try {
    imageData = fs.readFileSync(__dirname + "/" + image);
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
    if (files.length === 0) return res.json( { message: 'No Images Uploaded!'} );
    return res.json({ files });
  })
});

//get single image, might be useless...
app.get("/api/user/image/:email", (req, res) => {
  db.Image.findOne({
    where: { UserId: req.params.email }
  }).then(blob => {
    if (!blob) {
      res.json({ data: blob });
      return;
    }
    let name = blob.dataValues.name;
    const userUploadsDirectory = path.join('uploads');
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
  console.log("|||get all images|||")
  db.Image.findAll({})
    .then(blob => {
      const userUploadsDirectory = path.join('uploads');
      fs.readdir(userUploadsDirectory, (err, files) => {
        if (err) return res.json({ message: err });
        if (files.length <= blob.length) {
          for (let i = 0; i < blob.length; i++) {
            fs.writeFileSync( __dirname + "/uploads/" + blob[i].dataValues.name, blob[i].dataValues.data);
          }
        }
        console.log(files);
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