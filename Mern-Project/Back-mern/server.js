const dotenv= require("dotenv").config()
const express = require('express');
const cors =require("cors")
const mongoose= require("mongoose");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const app= express();
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true
}))
//Router
app.use('/user',require('./routes/userRouter'))
app.use('/api',require('./routes/categoryRouter'))
app.use('/api',require('./routes/upload'))
app.use('/api',require('./routes/productsRouter'))

//connect to mongo db
 const URI = process.env.MONGODB_URL
 mongoose.connect(URI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
 },err=>{
     if(err) throw err;
     console.log("connected TO DB");
 
    
 })


 const PORT = process.env.PORT ||6000
 app.listen(PORT,()=>{
     console.log("server on ",PORT);
 })
 //663332628874529 api key
 //du8w29iin cloud name