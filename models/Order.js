const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
   userID : {type :String, required : true},
   products : [
      {
         productId : {
            type : String,
         },
         quantity : {
            type : Number,
            default : 1
         }
      }
   ],
   amount : {
    type : Number, 
    required : true
   },
   address : {
    type : String,
    required : true
   },
   status : {
    type : String,
    default : "pending"
   }
}, {timestamps : true})



exports.module = mongoose.model("User", OrderSchema);