const User= require('../models/user');
const jwt = require('jsonwebtoken');
exports.signup = (req,res) => {
    User.findOne({email:req.body.email}).exec((error,user)=>{
        if(req.body.firstname==null||req.body.lastname==null||req.body.email==null||req.body.password==null){
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
            firstname,
            lastname,
            email,
            password
        } = req.body;
    
        const _user =  new User({
            firstname,
            lastname,
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
        if(error) return res.status(400).json({error});
        if(user){
            if(user.authenticate(req.body.password)){
                const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
                const {_id,firstname,lastname,email,role}=user;
                res.status(200).json({
                    token,
                    user:{_id,firstname,lastname,email,role}
                });
            }
            else{
                return res.status(400).json({
                    msg:'invalid pass'
                });
            }
        }
        else{
            return res.status(400).json({error});
        }
    });
}

exports.requireSignin=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token,process.env.JWT_SECRET);
    req.user = user;
    next();
    //    jwt.decode()
}