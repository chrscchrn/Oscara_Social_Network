const express = require("express");
const app = express();
var compression = require("compression");
const path = require("path");
const PORT = process.env.PORT || 3001;
const db = require("./models");
require("dotenv").config();
const fs = require("fs");
const multer = require('multer');
const sharp = require('sharp');
const routes = require("./routes");

// ** del uploads before pushing to heroku **
app.use(compression({ filter: shouldCompress }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('uploads'));

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) return false;
  return compression.filter(req, res);
}

if (process.env.NODE_ENV === "production") app.use(express.static("client/build"));

app.use(routes);

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

  let imageBuffer;
  try {
    imageBuffer = fs.readFileSync(__dirname + "/" + image);
  } catch (error) {
    console.log(error);
  }

  sharp(imageBuffer)
    .resize({ height: 210 })
    .toBuffer()
    .then(data => {
      fs.writeFileSync( __dirname + '/' + image, data);
    }).catch(err => {
      console.log(err, 'sharp error');
    });

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