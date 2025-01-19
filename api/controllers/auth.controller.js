
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
 export const google = async (req, res, next) => {
   try {
     const user = await User.findOne({ email: req.body.email });
     if (user) {
       const token = jwt.sign({ id: user._id }, process.env.secret);
       const { password: pass, ...rest } = user._doc;
       res
         .cookie('access_token', token, { httpOnly: true })
         .status(200)
         .json(rest);
     } else {
       const generatedPassword =
         Math.random().toString(36).slice(-8) +
         Math.random().toString(36).slice(-8);
       const hashedPassword =await bcrypt.hash(generatedPassword, 10);
       const newUser = new User({
         userName:
           req.body.name,
         email: req.body.email,
         password: hashedPassword,
         avatar: req.body.photo,
       });
       await newUser.save();
       const token = jwt.sign({ id: newUser._id }, process.env.secret);
       const { password: pass, ...rest } = newUser._doc;
       res
         .cookie('access_token', token, { httpOnly: true })
         .status(200)
         .json(rest);
     }
   } catch (error) {
     next(error);
   }
 };