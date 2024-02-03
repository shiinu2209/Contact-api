const express= require("express");
const dotenv= require("dotenv").config();
const connectdb=require("./config/db_connection")
connectdb();
const app=express();

const port=process.env.PORT ||5000;
app.use(express.json())
app.use("/api/contacts",require(("./routes/contactRoute")));
app.use("/api/users",require(("./routes/userRoute")));

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
});