const mongoose = require('mongoose');

const property = new mongoose.Schema({
  propertyProfile:  {type:String},
  apartmentType:{type:Array},
  Propertytype:{  type:Array},
  facing: {type:Array},
  floorType: {type:Array},
  Bhksize:{
    type :Number,
},
  Area: {
    type: Number,
},
floor: {type:Number},
floorinblid:  {type:Number},
age:{  type:Number},
price:  {type:Number},
rent: {type:Number},
maintainence:  {type:Number},
furnishType:  {type:Array},
availabilitydate:{type:Date},
streetAddress: {type:String},
homeAddress:  {type:String},
city:{type:Array},
zipcode:{  type:String},
addressdescription:{  type:String},
bathroom:{type:Number},
balcony:{type:Number},
cupboard:{type:Number},
ameneties:{  type:Array}, 
housingsystemdescription: {type:String},
},{timstamp:true}
);

module.exports= mongoose.model('property',property);