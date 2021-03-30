const mongoose = require('mongoose');
const userScheema =new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        
    },
     role:{
        type:String,
        require:true,
        default:0
    },
    cart:{
        type:Array,
        default:[]
    }
},{timestamps:true

})
module.exports =mongoose.model('Users',userScheema)