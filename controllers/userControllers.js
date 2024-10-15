import User from "../models/userModel.js";
import jwt from "jsonwebtoken"
import { genToken } from "../utils/genToken.js";

const registerUser= async(req,res,next)=>{
    const {username,email,password}=req.body
    try {
        const exists=await User.findOne({email})
        if(exists)
        {
            return res.status(400).json({
                meessage:"user is already exists !"
            })
        }
      const newUser = await User.create({username,email,password})
      let token=await genToken(newUser._id)
        return res.status(200).json({
            meessage:"Register success",
            data:{name:newUser.username,email:newUser.email},
            token
        })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            meessage:"internal server error",
            error
        })
    }
}
const loginUser= async(req,res,next)=>{
    const {email,password}=req.body
    try {
        const exists=await User.findOne({email})
        if(!exists || !(await exists.verifyPassword(password,exists.password)))
        {
            return res.status(400).json({
                meessage:"user doens,t existes, or password is incorrect"
            })
        }
        let token=await genToken(exists._id)
        return res.status(200).json({
        message:"user logged successfully",
        data:{name:exists.username,email:exists.email},
        token
       })
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            meessage:"internal server error",
            error
        })
    }
}

export default {
    registerUser,
    loginUser
}