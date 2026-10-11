import express from "express"
import { 
  addProduct, 
  listProduct, 
  removeProduct, 
  getSingleProduct, 
  updateProduct 
} from "../controller/productController.js"
import upload from "../middleware/multer.js"
import adminAuth from "../middleware/adminAuth.js"

const productRoutes = express.Router()

// ================= ADD PRODUCT =================
productRoutes.post(
  "/addproduct",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }
  ]),
  addProduct
)

// ================= GET ALL PRODUCTS =================
productRoutes.get("/list", listProduct)

// ================= GET SINGLE PRODUCT =================
productRoutes.get("/single/:id", getSingleProduct)

// ================= UPDATE PRODUCT =================
productRoutes.post(
  "/update",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }
  ]),
  updateProduct
)

// ================= DELETE PRODUCT =================
productRoutes.post("/remove/:id", adminAuth, removeProduct)

export default productRoutes