import mongoose from "mongoose";

const connectDb = async () => {
    try {
        console.log("Mongo URL exists:", !!process.env.MONGODB_URL);
console.log("Mongo user:", process.env.MONGODB_URL?.split("://")[1]?.split(":")[0]);
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB connected");
    } catch (error) {
        console.log("DB Error:", error.message);
    }
}

export default connectDb;