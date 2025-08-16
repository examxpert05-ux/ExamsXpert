import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();
const setCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // set true on HTTPS
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body; // role optional
    if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

    const exist = await User.findOne({ email });
    if (exist) return res.status(409).json({ message: "Email already used" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role: role === "admin" ? "admin" : "user" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    setCookie(res, token);
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }});
  } catch (e) {
    res.status(500).json({ message: "Signup error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    setCookie(res, token);
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }});
  } catch {
    res.status(500).json({ message: "Login error" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax", secure: false });
  res.json({ message: "Logged out" });
});

router.get("/me", async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.json({ user: null });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select("name email role");
    res.json({ user });
  } catch {
    res.json({ user: null });
  }
});

export default router;
