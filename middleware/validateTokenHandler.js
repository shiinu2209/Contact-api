const asyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken");
const validateToken=asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader=req.headers.authorization||req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1];
        jwt.verify(token,process.env.secv,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("user is not authorizeed");
            }
            req.user=decoded.user;
            next();
        })
        if(!token){
            req.status(401);
            throw new Error("token is expired");
        }
    }
});
module.exports=validateToken;