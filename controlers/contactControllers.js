const expressAsyncHandler = require("express-async-handler");
const contact=require("../models/contact_models")


const getcontacts=expressAsyncHandler(async(req,res)=>{
    const Contact= await contact.find({user_id:req.user_id});
    res.json(Contact);
});
const createcontact=expressAsyncHandler(async(req,res)=>{
    console.log(JSON.stringify(req.body))
    const {name,email,phone}=req.body;
    if(!name||!email||!phone){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const Contact=await contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })
    res.status(201).json(Contact);
});
const updatecontact=expressAsyncHandler(async(req,res)=>{
    const Contact=await contact.findById(req.params.id);
    if(!Contact){
        res.status(400);
        throw new Error("contact not found");
    }
    if(Contact.user_id.toString()!==req.user.id){
        res.status(401);
        throw new Error("no permission granted");
    }
    const updateContact=await contact.findByIdAndUpdate(
        req.params.id,
        req.body,{
            new:true
        }
    );
    res.status(200).json(updateContact);
});
const deletecontact=expressAsyncHandler(async(req,res)=>{
    const Contact=await contact.findById(req.params.id);
    if(!Contact){
        res.status(400);
        throw new Error("contact not found");
    }
    if(Contact.user_id.toString()!==req.user.id){
        res.status(401);
        throw new Error("no permission granted");
    }
    await contact.deleteOne({_id:req.params.id});
    res.status(200).json({"message":`delete contact ${req.params.id}`});
});
const getcontact=expressAsyncHandler(async(req,res)=>{
    const Contact=await contact.findById(req.params.id);
    if(!Contact){
        res.status(400);
        throw new Error("contact not found");
    }

    res.json(Contact);
});
module.exports={getcontacts,createcontact,updatecontact,deletecontact,getcontact}

