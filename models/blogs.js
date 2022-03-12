const mongoose = require("mongoose");

const blog = new mongoose.Schema({
      heading: {
      type: String,
      required: true
    },
      para:[{
      type:Object,
      img:[{
        type:String,
      }],
      content:String,
    }],
  
});

module.exports = mongoose.model("blogs", blog);
