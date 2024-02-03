const expressAsyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken");
const user=require("../models/userModel");
const bcrypt=require("bcrypt");
const registerUser=expressAsyncHandler(async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username||!email||!password){
        res.status(400);
        throw new Error("all fields are mandotory");
    }
    const userAvailable=await user.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("email already regsitered");
    }
    const hPass=await bcrypt.hash(password,10);
    
    const User=await user.create({
        username,
        email,
        password:hPass,
    });
    console.log(User);
    if(User){
        res.status(201).json({
          "id":User.id,
          "email":User.email  
        });
    }
    else{
        res.status(400);
        throw new Error("user data is not valiid");
    }
});
const loginUser=expressAsyncHandler(async(req,res)=>{
    const{email,password}=req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const User=await user.findOne({email});
    if(User&& (await bcrypt.compare(password,User.password))){
        const accessToken=jwt.sign({
            user:{
                username:User.username,
                email:User.email,
                id:User.id,
            }
        },
        process.env.secv,
        {expiresIn:"15m"}
        );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
    res.json({"message":"user logged in"});
});
const currentUser=expressAsyncHandler(async(req,res)=>{
    res.json(req.user);
});
module.exports={registerUser,loginUser,currentUser};