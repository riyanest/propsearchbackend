const { response } = require("express");
const express = require("express");
const { requireSignin } = require("../common-middleware");
const router = express.Router();
const property = require("../models/property");
var multer = require("multer");
var images = [];

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    console.log(file);
    var filetype = "";
    if (file.mimetype === "image/gif") {
      filetype = "gif";
    }
    if (file.mimetype === "image/png") {
      filetype = "png";
    }
    if (file.mimetype === "image/jpeg") {
      filetype = "jpg";
    }
    cb(null, file.fieldname + Date.now() + "." + filetype);
    images.push(file.fieldname + Date.now() + "." + filetype);
  }
});
var upload = multer({ storage: storage });

var uploadMultiple = upload.fields([{ name: "image", maxCount: 7 }]);

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
// , requireSignin

router.post("/addProperty", uploadMultiple, async function(req, res) {
  console.log(req.body);
  console.log(res.status);
  if (
    req.body.bhksize === null ||
    req.body.area === null ||
    req.body.floor === null
  ) {
    res.status(400).json({      message: "wrong input"+req.body.bhksize+req.body.area+req.body.floor    });
  } else {
    if (images != null) {
      const _property = new property({
        apartmentType: req.body.apartmentType,
        propertyProfile: req.body.propertyProfile,
        facing: req.body.facing,
        floor: req.body.floor,
        furnish: req.body.furnish,
        floorinbld: req.body.floorinbld,
        age: req.body.age,
        maintainance: req.body.maintainence,
        availabilitydate: req.body.availabilitydate,
        public: req.body.public,
        address: req.body.address,
        bhksize: req.body.bhksize,
        area: req.body.area,
        floor: req.body.floor,
        ameneties: req.body.ameneties,
        images: images
      });

      _property.save((error, data) => {
        if (error) {
          return res.status(400).json({
            message: `${error}`
          });
        }
        if (data && req.files) {
          return res.status(201).json({
            msg: "added and uploaded",
            data: data
          });
        }
      });
    }
  }
});

router.post("/addPic", uploadMultiple, async function(req, res) {
  if (req.files) {
    return res.status(201).json({
      msg: "added and uploaded",
      data: req.files
    });
  }
});

router.post("/delProperty", requireSignin, async function(req, res) {
  property.findOneAndDelete({ _id: req.body._id }).exec(error => {
    return res.status(401).json({ error });
  });
});

module.exports = router;
