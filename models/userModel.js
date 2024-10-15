import mongoose from "mongoose";
import bcryptjs from "bcryptjs"

const userModel= new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is reqired"],
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minLength:[8,"password must be in 8 characters"]
    },
},{timestamps:true})

// pre mongoose middleware
// befor we save a document this.password   field is hased using bcrypt


userModel.pre("save",async function(next){
    const salt=await bcryptjs.genSalt(10)
    this.password=await bcryptjs.hash(this.password,salt)
    next()
})

//method in mongoose
//method---------- function applied on instances of model
//statistics----- function applied on model directly

userModel.methods.verifyPassword= async function (pwd,pwdDb) {
return await  bcryptjs.compare(pwd,pwdDb)   
}


const User=mongoose.model("userModel",userModel)

export default User