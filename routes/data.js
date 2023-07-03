
var nodemailer = require('nodemailer');
const { response } = require("express");
const express = require("express");
const { requireSignin } = require("../common-middleware");
const router = express.Router();
const property = require("../models/property");
const lead = require("../models/lead");
const path = require('path');
const sale = require("../models/sale");
const rental = require("../models/rental");
const users = require("../models/user");
var multer = require("multer");
let images = [];

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Itsgraceproperties@gmail.com',
    pass: 'Sultana@2023'
  }
});


const csv = require('fast-csv'); // parses CSV files
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const main = async () => {

    // connect to db
    // const mongoDB = process.env.MONGODB_URI; 
    // mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
    // const db = mongoose.connection;
    // db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    // read csv file
    const prop = [];
    fs.createReadStream(path.join(__dirname, '/posts.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('error', error => console.error(error))
        .on('data', function(data) {
            data['_id'] = new mongoose.Types.ObjectId();
            data['author'] = new mongoose.Types.(data.author);
            data['date'] = Date.now();
            data['published'] = Boolean(data.published);
            prop.push(data);
        })
        .on('end', function(){
            // insert posts into db
            property.insertMany(prop, function(err, documents) {
                if (err) {
                    console.log(err);
                }
            });
            console.log(`${posts.length} + posts have been successfully uploaded.`);
            return;
        });
}

main().catch((error) => {
    console.error(error);
    process.exit();
  });


router.post("/mail", async function (req, res) {
  if (
    req.body.from == null ||
    req.body.to == null ||
    req.body.subject == null||
        req.body.text == null
  ) {
    res.status(400).json({
      message:
        "wrong input" + req.body.from + req.body.to + req.body.subject+req.body.text
    });
  } else {

    var mailOptions = {
  from: req.body.from,
  to: req.body.to,
  subject: req.body.subject,
  text: req.body.text
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    res.status(400).json({
     msg:error
    });

  } else {
    return res.status(201).json({
          msg: "Email sent",
          data: info.response,
        });
  }
});
  }
});

const storage = multer.diskStorage({
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

router.get("/readRevenue", requireSignin, async function (req, res) {
  const sales = await sale.find({}).exec();
    const rentals = await rental.find({}).exec();
  let revenue=0;
  let deals=0;
  sales.map((val)=>{
    revenue+=parseInt(val.commision)
    deals++
})
rentals.map((val)=>{
    revenue+=parseInt(val.commision)
  deals++
})
  
  res.status(200).json({details:{ revenue: revenue,deals:deals }});
  
});

router.get("/readlead", requireSignin, async function (req, res) {
  const leads = await lead.find({}).exec();
  res.status(200).json({ leads: leads });
});

router.post("/createLead", async function (req, res) {
  if (
    req.body.bhksize == null ||
    req.body.area == null ||
    req.body.floor == null
  ) {
    res.status(400).json({
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
router.get("/allProperties", 
            async function (req, res) {
  const prop = await property.find({}).exec();
  res.status(200).json({ properties: prop });
});


router.get("/readSale", requireSignin, async function (req, res) {
  const sales = await sale.find({}).exec();
  res.status(200).json({ sale: sales });
});  

router.post("/createSale", async function (req, res) {
  if (
    req.body.bhksize == null ||
    req.body.area == null ||
    req.body.floor == null
  ) {
    res.status(400).json({
      message:
        "wrong input" + req.body.bhksize + req.body.area + req.body.floor,
    });
  } else {
    const _sale = new sale({
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
    _sale.save((error, data) => {
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

router.post("/deleteSale", requireSignin, async function (req, res) {
  sale.findOneAndDelete({ _id: req.header.id }).exec((error, data) => {
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

router.get("/readRental", requireSignin, async function (req, res) {
  const rentals = await rental.find({}).exec();
  res.status(200).json({ rentals: rentals });
});

router.post("/createRental", async function (req, res) {
  if (
    req.body.bhksize == null ||
    req.body.area == null ||
    req.body.floor == null
  ) {
    res.status(400).json({
      message:
        "wrong input" + req.body.bhksize + req.body.area + req.body.floor,
    });
  } else {
    const _rental = new rental({
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
    _rental.save((error, data) => {
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

router.post("/deleteRental", requireSignin, async function (req, res) {
  rental.findOneAndDelete({ _id: req.header.id }).exec((error, data) => {
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

//properties


router.get("/allpublicProperties", async function (req, res) {
  const prop = await property.find({ public: true }).exec();
  res.status(200).json({ properties: prop });
  console.log(prop);
});

router.post("/addProperty", async function (req, res) {
  if (
    req.body.Bhksize == null ||
    req.body.Area == null ||
    req.body.floor == null
  ) {
    console.log(req.body)
    res.status(400).json({
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
            console.log(req.body)
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

router.use('/', function (req, res, next) {
 
    const options = {
        root: path.join(__dirname)
    };
 
    const fileName = 'pano.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
            next();
        }
    });
});

module.exports = router;
