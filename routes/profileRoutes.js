import { Router } from "express";
import {auth} from "../middlewares/auth.js";
import User from "../models/userModel.js";

const router=Router()

router.get("/",auth,async(req,res,next)=>{
    let user=await User.findById(req.user)
    res.send(`hello ${user.username} this is profile route`)
})


export default router


