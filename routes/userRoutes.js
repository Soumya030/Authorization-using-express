import { Router } from "express";
import userControllers from "../controllers/userControllers.js";
const router=Router()

router.post("/register",userControllers.registerUser)
router.post("/login",userControllers.loginUser)


export default router