
 import User from "../models/user.model.js"
 import bcrypt from 'bcrypt'
import { errorhandler } from "../utills/error.js";
import jwt from "jsonwebtoken";
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
 export const signin=async(req,res,next)=>{
  try{ const {email,password}=req.body;
    const user=await User.findOne({email});
     if(!user){
        return res(next(errorhandler(401,"invalid credentials")));
     }
      const validpassword=await bcrypt.compare(password,user.password);
      if(!validpassword)return next(errorhandler(401,"invalid credentials"));
      const token=jwt.sign({_id:user._id},process.env.secret,{
         expiresIn: "7d",
       });
       res.cookie('token',token,{httponly:true},{
         expires: new Date(Date.now() + 8 * 3600000),
       })
       .status(200)
       .json({user});}
       catch(err){
          next(err);
       }


 }