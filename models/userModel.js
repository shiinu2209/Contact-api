const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
username:{
    type: String,
    required:[true,"please add username"]
},
email:{
    type:String,
    required:[true,"please add email"],
    unique:[true,"email already registered"]
},
password:{
    type:String,
    required:[true,"please add password"]
}

},
{
    timestamp:true
});
module.exports=mongoose.model("user",userSchema);