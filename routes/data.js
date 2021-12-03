const { response } = require("express");
const express = require("express");
const { requireSignin } = require("../common-middleware");
const router = express.Router();
const property = require("../models/property");
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

router.post("/addProperty", requireSignin, async function(req, res) {
  if (
    req.body.bhksize == null ||
    req.body.area == null ||
    req.body.price == null ||
    req.body.floor == null
  ) {
    res.status(400).json({
      message: "wrong input"
    });
  } else {
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
