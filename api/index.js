import  express from 'express';
 const app=express();
 import dotenv from 'dotenv'
 import mongoose  from 'mongoose';
 import userRouter from "./routes/user.router.js"
 import authRouter from "./routes/auth.router.js"
 dotenv.config();
 app.use(express.json());
 mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("db connection successfully")
 }).catch(()=>{
    console.log("error while connection to the database")
 })

  app.listen(3000,()=>{
     console.log("app is listen on port 3000 !!")
  });
   // app.get("/api/user",(req,res)=>{
   //     res.send("hello sir");
   // })
  app.use("/api/user",userRouter)
  app.use("/api/auth",authRouter)

  app.use((err,req,res,next)=>{
     const statusCode=err.statusCode||500;
     const message=err.message||"Internal Server Error"
     return res.status(statusCode).json({
      success:false,
      statusCode,
      message,
     });
  });
   
  

