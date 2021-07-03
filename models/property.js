const mongoose = require('mongoose');

const property = new mongoose.Schema({
    // hometype:{
    //     type:String,
    //     required:true,
    //     trim:true
    // },
    // housingsystem:{
    //     type:String,
    // },
    // housingsystemdescription:{ 
    //     type:String,
    // },
    // address:{
    //     type :String,
    //     required: true,
    //     trim:true
    // },
    bhksize:{
        type :Number,
        required: true,
        min:1,
        max:20
    },
    area: {
        type: String,
        required:true,
        trim: true,
    },
    price: {
        type:Number,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    floor:{
        type:Number,
        required:false,
    },
    // author:{
    //     authorid:{
    //         type:Number},
    //     authorname:{type:String},
    //     authornumber:{type:Number},
    
    // },
    // ameneties:{
    //   park:{
    //       type:Boolean
    //   },
    //   parking:{
    //     type:Boolean
    //   },
    //   lift:{
    //     type:Boolean
    //   },
    //   suburban:{
    //     type:Boolean
    //   },
    //   city:{
    //     type:Boolean
    //   },
    //   garden:{
    //     type:Boolean
    //   },
    //   pool:{
    //     type:Boolean
    //   },
    //   gymnasium:{
    //     type:Boolean
    //   },  
    // }
},{timstamp:true}
);

module.exports= mongoose.model('propertyobj',property);