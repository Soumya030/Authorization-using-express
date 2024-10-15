import { dbConnection } from "./config/db.Connect.js";
import express from "express"
const app=express()
import userRouter from "./routes/userRoutes.js";
import profileRouter from "./routes/profileRoutes.js";

//database connection 
dbConnection()
// middlewares
app.use(express.json())

// rouetrs


app.use("/api/v1/user",userRouter)
app.use("/api/v1/profile",profileRouter)

export default app