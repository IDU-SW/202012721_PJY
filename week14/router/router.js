const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require("multer");
const multerS3 = require('multer-s3');
const AWS = require("aws-sdk");
AWS.config.loadFromPath(__dirname + "/../aws-config.json");

let s3 = new AWS.S3();

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "idu-2020-pjy",
    key: function (req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension)
    },
    acl: 'public-read-write',
  })
})


router.post('/upload', upload.single("uploadfile"), function(req, res, next){
  let imgFile = req.file;
  res.json(imgFile);
})

router.get('/upload', function(req, res, next) {
  res.render('upload');
});

module.exports = router;