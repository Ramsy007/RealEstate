import  express from 'express';
 const app=express();
 import dotenv from 'dotenv'
 import mongoose  from 'mongoose';
 dotenv.config();
   
 mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("db connection successfully")
 }).catch(()=>{
    console.log("error while connection to the database")
 })

  app.listen(3000,()=>{
     console.log("app is listen on port 3000 !!")
  });

