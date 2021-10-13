const { response } = require('express');
const express = require('express');
const { requireSignin } = require('../common-middleware');
const router = express.Router();
const property=require('../models/property');
router.get('/',(req,res,nest)=>{
    res.status(200).json({
        message: 'hello from server'
    });
});
router.get("/allProperties", requireSignin,async function (req, res) { 
    const prop=await property.find({})
    .exec()  
    // .then((response) =>res.status(200).json({ properties: response }))
    // .catch((err) => res.status(404).json({ message: err.message }));
    res.status(200).json({ properties: prop });
    console.log(prop);
  });

  router.post("/addProperty", requireSignin, async function (req, res) {
            if(req.body.bhksize==null||req.body.area==null||req.body.price==null||req.body.floor==null){
                res.status(400).json({
                    message:'wrong input'
                });
            }
            else{
                const {
                    bhksize,
                    area,
                    price,
                    floor
                } = req.body;
            
                const _property =  new property({
                    bhksize:req.body.bhksize,
                    area:req.body.area,
                    price:req.body.price,
                    floor:req.body.floor
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

  router.post("/delProperty", requireSignin, async function (req, res) {
    property.findOneAndDelete({bhksize:req.body.bhksize,area:req.body.area,price:req.body.price,floor:req.body.floor})
    .exec((error)=>{
         return res.status(401).json({error});
    });
});


module.exports=router;