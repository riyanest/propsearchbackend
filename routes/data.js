const { response } = require("express");
const express = require("express");
const { requireSignin } = require("../common-middleware");
const router = express.Router();
const property = require("../models/property");
const lead = require("../models/lead");
const buy = require("../models/buy");
const rental = require("../models/rental");
const users = require("../models/user");
var multer = require("multer");
let images = [];
var storage = multer.diskStorage({
  destination: "public/",
  filename: (req, file, cb) => {
    console.log(file);
    let img = "";
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
    img = file.fieldname + Date.now() + "." + filetype;
    images.push(img);
    cb(null, img);
  },
});
var upload = multer({ storage: storage });

var uploadMultiple = upload.fields([{ name: "image", maxCount: 7 }]);

router.get("/", (req, res, nest) => {
  res.status(200).json({
    message: "hello from server",
  });
});

//lead

router.get("/readlead", requireSignin, async function (req, res) {
  const prop = await lead.find({}).exec();
  res.status(200).json({ properties: prop });
});

router.post("/createLead", async function (req, res) {
  if (
    req.body.bhksize == null ||
    req.body.area == null ||
    req.body.floor == null
  ) {
    res
      .status(400)
      .json({
        message:
          "wrong input" + req.body.bhksize + req.body.area + req.body.floor,
      });
  } else {
    const _lead = new lead({
      name: req.body.name,
      name: req.body.propertyProfile,
      facing: req.body.facing,
      houseType: req.body.houseType,
      furnish: req.body.furnish,
      budget: req.body.budget,
      address: req.body.address,
      bhksize: req.body.bhksize,
      area: req.body.area,
      extraSpeccifications: req.body.extraSpeccifications,
    });
    _lead.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: `${error}`,
        });
      } else {
        return res.status(201).json({
          msg: "added",
          data: data,
        });
      }
    });
  }
});

router.post("/deleteLead", requireSignin, async function (req, res) {
  lead.findOneAndDelete({ _id: req.header.id }).exec((error, data) => {
    if (error) {
      return res.status(401).json({ error });
    } else {
      return res.status(201).json({
        msg: "deleted",
        data: data,
      });
    }
  });
});

//buy

router.get("/readBuy", requireSignin, async function (req, res) {
  const prop = await lead.find({}).exec();
  res.status(200).json({ properties: prop });
});

router.post("/createBuy", async function (req, res) {
  if (
    req.body.bhksize == null ||
    req.body.area == null ||
    req.body.floor == null
  ) {
    res
      .status(400)
      .json({
        message:
          "wrong input" + req.body.bhksize + req.body.area + req.body.floor,
      });
  } else {
    const _lead = new lead({
      name: req.body.name,
      name: req.body.propertyProfile,
      facing: req.body.facing,
      houseType: req.body.houseType,
      furnish: req.body.furnish,
      budget: req.body.budget,
      address: req.body.address,
      bhksize: req.body.bhksize,
      area: req.body.area,
      extraSpeccifications: req.body.extraSpeccifications,
    });
    _lead.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: `${error}`,
        });
      } else {
        return res.status(201).json({
          msg: "added",
          data: data,
        });
      }
    });
  }
});

router.post("/deleteBuy", requireSignin, async function (req, res) {
  lead.findOneAndDelete({ _id: req.header.id }).exec((error, data) => {
    if (error) {
      return res.status(401).json({ error });
    } else {
      return res.status(201).json({
        msg: "deleted",
        data: data,
      });
    }
  });
});

//rent

//properties

router.get("/allProperties", requireSignin, async function (req, res) {
  const prop = await property.find({}).exec();
  res.status(200).json({ properties: prop });
});

router.get("/allpublicProperties", async function (req, res) {
  const prop = await property.findOne({ public: true }).exec();
  res.status(200).json({ properties: prop });
  console.log(prop);
});

router.post("/addProperty", async function (req, res) {
  if (
    req.body.bhksize == null ||
    req.body.area == null ||
    req.body.floor == null
  ) {
    res
      .status(400)
      .json({
        message:
          "wrong input" + req.body.bhksize + req.body.area + req.body.floor,
      });
  } else {
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
      status: 1,
      area: req.body.area,
      floor: req.body.floor,
      ameneties: req.body.ameneties,
    });
    _property.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: `${error}`,
        });
      } else {
        return res.status(201).json({
          msg: "added",
          data: data,
        });
      }
    });
  }
});

router.post("/addPic", uploadMultiple, async function (req, res) {
  console.log(req.body.id, images);
  if (req.body.id) {
    let id = req.body.id;
    property.findByIdAndUpdate(
      id,
      { $push: { images: images } },
      { new: true, upsert: true },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  } else {
    console.log(images);
  }
  images = [];
});

router.post("/delProperty", requireSignin, async function (req, res) {
  property.findOneAndDelete({ _id: req.header.id }).exec((error, data) => {
    if (error) {
      return res.status(401).json({ error });
    } else {
      return res.status(201).json({
        msg: "deleted",
        data: data,
      });
    }
  });
});

router.get("/specificProperties", async function (req, res) {
  if (req.body.PropertyProfile == "sell") {
    const prop = await property
      .find({
        "propertyProfile.status": req.body.PropertyProfile,
        "propertyProfile.price": {
          $lt: req.body.max,
          $gt: req.body.min,
        },
        "address.location": req.body.location,
        apartmentType: req.body.apartmentType,
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
          $lt: req.body.max,
        },
        "address.location": req.body.location,
        apartmentType: req.body.apartmentType,
      })
      .exec();
    console.log(prop);
    res.status(200).json({ properties: prop });
  }
});

// users

router.get("/allUsers", requireSignin, async function (req, res) {
  const user = await users.find({}).exec();
  res.status(200).json({ users: user });
});

router.post("/delUser", requireSignin, async function (req, res) {
  users.findOneAndDelete({ _id: req.header.id }).exec((error, data) => {
    if (error) {
      return res.status(401).json({ error });
    } else {
      return res.status(201).json({
        msg: "deleted",
        data: data,
      });
    }
  });
});

module.exports = router;
