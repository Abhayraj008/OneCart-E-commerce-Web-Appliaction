import dotenv from "dotenv";

// ENV load
dotenv.config({ path: "./.env" });

import express from "express";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoute.js";   // ⭐ NEW

const port = process.env.PORT || 6000;

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/review", reviewRoutes);  // ⭐ NEW

// test env
console.log("API KEY:", process.env.CLOUDINARY_API_KEY);
console.log("ENV TEST:", process.env.CLOUDINARY_NAME);

// start server
app.listen(port, () => {
  console.log("Hello From Server");
  connectDb();
});