const { response } = require('express');
const express = require('express');
const router = express.Router();
const property=require('../models/property');
router.get('/',(req,res,nest)=>{
    res.status(200).json({
        message: 'hello from server'
    });
});
router.get("/allProperties", async function (req, res) { 
    const prop=await property.find({})
    .exec()  
    // .then((response) =>res.status(200).json({ properties: response }))
    // .catch((err) => res.status(404).json({ message: err.message }));
    res.status(200).json({ properties: prop });
    console.log(prop);
  });

  router.post("/addProperty", async function (req, res) {
        
            if(req.body.Bhksize==null||req.body.Area==null||req.body.price==null||req.body.floor==null){
                res.status(400).json({
                    message:'wrong input'
                });
            }
            else{
                // const {
                //     Bhksize,
                //     Area,
                //     price,
                //     floor
                // } = req.body;
            
                const _property =  new property({
                        propertyProfile:req.body.propertyProfile,
                        ApartmentType:req.body.ApartmentType,
                        Propertytype:req.body.Propertytype,
                        facing:req.body.facing,
                        floorType:req.body.floorType,
                        Bhksize:req.body.Bhksize,
                        Area:req.body.Area,
                        floor:req.body.floor,
                        floorinblid:req.body.floorinblid,
                        age:req.body.age,
                        price:req.body.price,
                        rent:req.body.rent,
                        maintainence:req.body.maintainence,
                        furnishType:req.body.furnishType,
                        availabilitydate:req.body.availabilitydate,
                        streetAddress:req.body.streetAddress,
                        homeAddress:req.body.homeAddress,
                        city:req.body.city,
                        ZipCode:req.body.ZipCode,
                        addressdescription:req.body.addressdescription,
                        bathrooms:req.body.bathrooms,
                        balcony:req.body.balcony,
                        cupboard:req.body.cupboard,
                        ameneties:req.body.ameneties,
                        housingsystemdescription:req.body.housingsystemdescription,
                });
                _property.save((error,data)=>{
                    if(error){
                        return res.status(400).json({
                            message:`${error}`
                        });
                    }
                
                    if(data){
                        return res.status(201).json({
                            msg:'added'                       
                        });
                    }
                });
            }
  });
module.exports=router;