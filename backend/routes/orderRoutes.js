import express from 'express'
import isAuth from '../middleware/isAuth.js'
import { 
  allOrders, 
  placeOrder, 
  placeOrderRazorpay, 
  updateStatus, 
  userOrders, 
  verifyRazorpay,
  getOrderStats
} from '../controller/orderController.js'
import adminAuth from '../middleware/adminAuth.js'

const orderRoutes = express.Router()

// ================= USER ROUTES =================
orderRoutes.post("/placeorder", isAuth, placeOrder)
orderRoutes.post("/razorpay", isAuth, placeOrderRazorpay)
orderRoutes.post("/userorder", isAuth, userOrders)
orderRoutes.post("/verifyrazorpay", isAuth, verifyRazorpay)

// ================= ADMIN ROUTES =================
orderRoutes.post("/list", adminAuth, allOrders)
orderRoutes.post("/status", adminAuth, updateStatus)

// ================= 📊 STATS ROUTE =================
orderRoutes.get("/stats", getOrderStats)

export default orderRoutes