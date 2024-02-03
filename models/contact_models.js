const mongoose=require("mongoose");
const schema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    "name":{
        type: String,
        required:[true,"please add name"]

    },
    "email":{
        type:String,
        required:[true,"please add gmail"]
    },
    "phone":{
        type:String,
        required:[true,"please add number"]
    }
},{
    timestamps:true
})
module.exports= mongoose.model("contact",schema)