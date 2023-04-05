const mongoose = require("mongoose");

const lead = new mongoose.Schema(
  {
    Name:{
      type:String,
      required:true
    },
    
    commision:{
      type:String,
      required:true
    },
    
    apartmentType: {
      type: String,
      required: true
    },
    
    propertyProfile: {
      type: Object,
      required: true,
      price: {
        type: Number,
        required: true
      },
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
    status:{type:Boolean},
    uploaddate: { type: Date, default: Date.now },
    maintainence: {
      type: Number
    },
    availabilitydate: Date,
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

module.exports = mongoose.model("buy", buy);
