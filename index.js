const express = require('express');
const env = require('dotenv');
const { json } = require('express');
const app = express();
const mongoose = require('mongoose');
const result = env.config();
const bodyParser =require('body-parser');
env.config();
//const routes = require('./routes/data');
const authroute=require('./routes/auth');
const cors = require('cors');

mongoose.connect(
    'mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@propsearchbackend.yohsd.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority',
     {
         useNewUrlParser: true,
         useUnifiedTopology: true
     }).then(()=>{
         console.log("database connected");
     });

app.use(cors());
app.use(bodyParser());
app.use('/auth',authroute);

app.post('/data',(req,res,nest)=>{
    res.status(200).json({
        message: req.body
    });
});

app.get('/',(req,res,nest)=>{
    res.status(200).json({
        message: 'hello from server'
    });
});

app.listen(process.env.PORT,()=>{
    if (result.error) {
        throw result.error
      }
    console.log(result.parsed);
    console.log(`server is running on port ${process.env.PORT}`);
});