import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.get("/", (_, res) => res.send("ExamsXpert API running - TEST MODE"));
app.get("/api/auth/me", (_, res) => res.json({ user: null }));
app.get("/api/tests", (_, res) => res.json({ tests: [] }));

app.listen(process.env.PORT, () =>
  console.log(`TEST API on http://localhost:${process.env.PORT}`)
);