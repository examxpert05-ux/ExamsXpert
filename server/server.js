import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./src/routes/auth.js";
import testRoutes from "./src/routes/tests.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.get("/", (_, res) => res.send("ExamsXpert API running"));
app.use("/api/auth", authRoutes);
app.use("/api/tests", testRoutes);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.log('⚠️  MongoDB not available - running in demo mode');
  }
  app.listen(process.env.PORT, () =>
    console.log(`🚀 API running on http://localhost:${process.env.PORT}`)
  );
};
start();
