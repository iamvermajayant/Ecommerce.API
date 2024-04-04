const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Username is required!"],
        unique : [true, "Username Already Exists"]
    },
    email : {
        type : String,
        required : [true, "Email is required!"],
        unique : [true, "Email Already exists"],
    },
    password : {
        type : String,
        required : [true, "Password is required!"]
    },
    isAdmin : {
        type : Boolean, 
        default : false,
    }
}, {timestamps : true})



module.exports = mongoose.model("User", userSchema);