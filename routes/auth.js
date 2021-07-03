const express = require('express');
const { signup, signin} = require('../controller/auth');
const { requireSignin}= require('../common-middleware/index');
const {validateSignupRequest,validateSigninRequest,isRequestValidated}= require('../validator/auth');
const router = express.Router();

router.post('/signin',validateSigninRequest,isRequestValidated,signin);

router.post('/signup',validateSignupRequest,isRequestValidated,signup);

router.post('/profile',requireSignin,(req,res)=>{
    res.status(200).json({user:'profile'})
});

module.exports=router;