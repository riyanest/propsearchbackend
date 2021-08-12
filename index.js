const express = require('express');
require('dotenv').config({});
const cors = require('cors');
const { json } = require('express');
const app = express();
const bodyParser =require('body-parser');
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
const mongoose = require('mongoose'); 
const user=process.env.MONGO_DB_USER;
const password=process.env.MONGO_DB_PASSWORD;
const database=process.env.MONGO_DB_DATABASE;
mongoose.connect(
     `mongodb+srv://${user}:${password}@propsearchbackend.yohsd.mongodb.net/${database}?retryWrites=true&w=majority`,
      {
          useNewUrlParser: true,
          useUnifiedTopology: true
      }).then(()=>{
          console.log("database connected"); 
    });

app.use('/auth',require('./routes/auth'));
app.use('/data', require('./routes/data'));   

app.get('/',(req,res,nest)=>{
    res.status(200).json({
        message: 'hello from server'
    });
});

app.listen(process.env.PORT,function(err){
    if (err) {
        throw err    
      } 
    console.log(`server is running on port ${process.env.PORT}`);
}); 