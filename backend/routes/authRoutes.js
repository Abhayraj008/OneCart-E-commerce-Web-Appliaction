import express from "express"
import { 
  adminLogin, 
  googleLogin, 
  login, 
  logOut, 
  registration 
} from "../controller/authController.js"

const authRoutes = express.Router()

// User Registration
authRoutes.post("/registration", registration)

// User Login
authRoutes.post("/login", login)

// Google Login
authRoutes.post("/googlelogin", googleLogin)

// User Logout
authRoutes.get("/logout", logOut)

// Admin Login
authRoutes.post("/adminlogin", adminLogin)

export default authRoutes