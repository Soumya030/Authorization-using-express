import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
export async function auth(req,res,next) {
    try {
        let token;
        if(req.headers.authorization?.startsWith("Bearer")){
            token=req.headers.authorization.split(" ")[1]
        }
        let decodedToken = await jwt.verify(token, "Topsecret")
        const user = await User.findById(decodedToken.id)
        req.user = user?._id
        next()
    } catch (error) {
        res.status(401).json({
            message:error.message
        })
    }
    
}