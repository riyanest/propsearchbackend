const User= require('../models/user');
const AppliedUser= require('../models/applieduser');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
const result = env.config();
env.config();
exports.signup =(req,res) => {
    User.findOne({email:req.body.email}).exec((error,user)=>{
        if(req.body.firstName==null||req.body.lastName==null||req.body.email==null||req.body.password==null){
            res.status(400).json({
                message:'wrong input'
            });
        }
        else{
            if(user) return res.status(400).json({
                message:'user already registered'
            });
        }

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
    
        const _user =  new AppliedUser({
            firstName,
            lastName,
            email,
            password,
            username: Math.random().toString()  
        });
        _user.save((error,data)=>{
            if(error){
                return res.status(400).json({
                    message:`${error}`
                });
            }
        
            if(data){
                return res.status(201).json({
                    msg:'registered'                       
                });
            }
        });
    });
}

exports.signin = (req,res) => {
    User.findOne({email:req.body.email})
    .exec((error,user)=>{
        if(error) return res.status(401).json({error});
        if(user){
            if(user.authenticate(req.body.password)){
                const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'}); 
                const {_id,firstName,lastName,email,role,fullName}=user;
                res.status(200).json({
                    token,
                    user:{_id,firstName,lastName,email,role,fullName}
                });
            }
            else{
                return res.status(400).json({
                    msg:'invalid pass'
                });
            }
        }
        else if(user.length>1){
            return res.status(401).json({
                message:'auth failed'
            });
        }
        else{
            return res.status(401).json({error});
        }
    });
}

