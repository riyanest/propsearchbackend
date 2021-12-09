const { response } = require("express");
const express = require("express");
const { requireSignin } = require("../common-middleware");
const router = express.Router();
const property = require("../models/property");
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../public/');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var upload=multer({storage:storage})
var multipleuploads= upload.fields([{name:'file1'},{name:'file2'},{name:'file3'},{name:'file4'},{name:'file5'},{name:'file6'},{name:'file7',maxCount:7}])

router.get("/", (req, res, nest) => {
  res.status(200).json({
    message: "hello from server"
  });
});
router.get("/allProperties", requireSignin, async function(req, res) {
  const prop = await property.find({}).exec();
  res.status(200).json({ properties: prop });
  console.log(prop);
});

router.get("/allpublicProperties", async function(req, res) {
  const prop = await property.findOne({ public: true }).exec();
  res.status(200).json({ properties: prop });
  console.log(prop);
});

router.get("/specificProperties", async function(req, res) {
  if (req.body.PropertyProfile == "sell") {
    const prop = await property
      .find({
        "propertyProfile.status": req.body.PropertyProfile,
        "propertyProfile.price": {
          $lt: req.body.max,
          $gt: req.body.min
        },
        "address.location": req.body.location,
        apartmentType: req.body.apartmentType
      })
      .exec();
    console.log(prop);
    res.status(200).json({ properties: prop });
  } else {
    const prop = await property
      .find({
        "propertyProfile.status": req.body.PropertyProfile,
        "propertyProfile.rent": {
          $gt: req.body.min,
          $lt: req.body.max
        },
        "address.location": req.body.location,
        apartmentType: req.body.apartmentType
      })
      .exec();
    console.log(prop);
    res.status(200).json({ properties: prop });
  }
});

router.post("/addProperty", requireSignin,multipleuploads, async function(req, res) {
  if (
    req.body.bhksize == null ||
    req.body.area == null ||
    req.body.price == null ||
    req.body.floor == null
  ) {
    res.status(400).json({
      message: "wrong input"
    });
  }
  else if(req.files){
    console.log("uploaded")
  }else {
    const { bhksize, area, price, floor } = req.body;

    const _property = new property({
      bhksize: req.body.bhksize,
      area: req.body.area,
      price: req.body.price,
      floor: req.body.floor
    });

    _property.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: `${error}`
        });
      }
      if (data) {
        return res.status(201).json({
          msg: "added",
          data: data
        });
      }
    });
  }
});

router.post("/delProperty", requireSignin, async function(req, res) {
  property.findOneAndDelete({ _id: req.body._id }).exec(error => {
    return res.status(401).json({ error });
  });
});

module.exports = router;
