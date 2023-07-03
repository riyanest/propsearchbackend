const mongoose = require("mongoose");

const property = new mongoose.Schema(
  {
    bhk: {
      type: String,
      required: true
    },
        address: {
      type: String,
      required: true
    },
            area: {
      type: String,
      required: true
    },
          price: {
      type: String,
    },
            parking: {
      type: String,
      required: true    },
            community: {
      type: String,
                    required: true
    },
            name: {
      type: String,
      required: true
    },
            number: {
      type: String,
      required: true
    },
            type: {
      type: String,
      required: true
    },
            description: {
      type: String,
      required: true
    },








  },
  { timstamp: true }
);

module.exports = mongoose.model("properties", property);
