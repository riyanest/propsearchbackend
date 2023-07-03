const mongoose = require("mongoose");

const property = new mongoose.Schema(
  {
    apartmentType: {
      type: String,
      required: true
    },
  },
  { timstamp: true }
);

module.exports = mongoose.model("properties", property);
