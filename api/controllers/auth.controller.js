
 import User from "../models/user.model.js"
 import bcrypt from 'bcrypt'
 export const  signup= async(req,res,next)=>{
      const {userName,email,password}=req.body;
       const hashedpassword=await bcrypt.hash(password,10);
       const newUser=new User({userName,email,password:hashedpassword});
       try{ 
        await newUser.save();
       res.status(201).json("user created successfully")}
       catch(err){
          next(err);
       }
       
 }