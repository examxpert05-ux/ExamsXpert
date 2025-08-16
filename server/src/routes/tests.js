import { Router } from "express";
import Test from "../models/Test.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

// Public: list tests (optional ?exam=UPSC filter)
router.get("/", async (req, res) => {
  try {
    const q = {};
    if (req.query.exam) q.exam = req.query.exam;
    const tests = await Test.find(q).select("title exam description createdAt");
    res.json({ tests });
  } catch (error) {
    res.json({ tests: [] }); // Return empty array if DB not available
  }
});

// Public: get a test with questions (answers are also sent; frontend can hide)
router.get("/:id", async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ message: "Not found" });
    res.json({ test });
  } catch (error) {
    res.status(404).json({ message: "Database not available" });
  }
});

// Admin: create test
router.post("/", requireAuth, requireAdmin, async (req, res) => {
  const { title, exam, description, questions } = req.body;
  if (!title || !exam || !Array.isArray(questions) || questions.length === 0)
    return res.status(400).json({ message: "Invalid payload" });
  const test = await Test.create({
    title, exam, description, questions, createdBy: req.userId
  });
  res.status(201).json({ test });
});

// Admin: update test
router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
  const updated = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ test: updated });
});

// Admin: delete test
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  await Test.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

export default router;
