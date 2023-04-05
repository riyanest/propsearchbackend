const mongoose = require("mongoose");

const lead = new mongoose.Schema(
  {
    Name:{
      type:String,
      required:true
    },
    facing: {
      type: String
    },
    houseType:{
    type:String,reqired:true},
    furnish: String,
    budget:{type:String,reqired:true},
    area: {
        type: String,
        required: true
    },
    status:{type:Boolean},
    bhksize: {
      type: Number,
      required: true
    },
    extraSpeccifications:{
    type:String
  },

  },
  { timstamp: true }
);

module.exports = mongoose.model("lead", lead);
