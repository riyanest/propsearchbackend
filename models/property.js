const mongoose = require("mongoose");

const property = new mongoose.Schema(
  {
    apartmentType: {
      type: String,
      required: true
    },
    propertyProfile: {
      type: Object,
      required: true,
      status: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      rent: Number
    },
    facing: {
      type: String
    },
    floor: Number,
    furnish: String,
    floorinblid: Number,
    age: {
      type: Date,
      required: true
    },
    uploaddate: { type: Date, default: Date.now },
    maintainence: {
      type: Number,
      required: true
    },
    availabilitydate: Date,
    public: {
      type: Boolean,
      required: true
    },
    address: {
      type: Object,
      required: true,
      streetAddress: {
        type: String,
        required: true
      },
      homeAddress: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      cord: {
        type: Object,
        required: true,
        x: Number,
        y: Number
      }
    },
    bhksize: {
      type: Number,
      required: true
    },
    area: {
      type: Number,
      required: true,
      trim: true
    },
    floor: {
      type: Number,
      required: false
    },
    // author:{
    //     authorid:{
    //         type:Number},
    //     authorname:{type:String},
    //     authornumber:{type:Number},

    // },
    ameneties: {
      type: Object,
      balcony: Number,
      cupboard: Number,
      park: Boolean,
      parking: Boolean,
      lift: Boolean,
      suburban: Boolean,
      city: Boolean,
      garden: Boolean,
      pool: Boolean,
      gymnasium: Boolean
    }
  },
  { timstamp: true }
);

module.exports = mongoose.model("properties", property);
