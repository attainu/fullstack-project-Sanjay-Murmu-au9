const mongoose = require('mongoose');


const categoryScheema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true,
        unique:true
    }
},{
    timestamps : true
})
module.exports = mongoose.model("Category",categoryScheema)
 