const mongoose = require("mongoose");

const lead = new mongoose.Schema(
  {
    Name:{
      type:String,
      required:true
    },
    houseType:{
    type:String,reqired:true
    },
    furnish: String,
    budget:{type:String,reqired:true},
    area: {
        type: String,
        required: true
    },
    bhksize: {
      type: Number,
      required: true
    },
    extraSpecifications:{
    type:String
  },

  },
  { timstamp: true }
);

module.exports = mongoose.model("leads", lead);
