import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  answerIndex: { type: Number, required: true },      // correct option index
  explanation: { type: String, default: "" }          // solution text
});

const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
  exam: { type: String, required: true },             // e.g., UPSC, SSC, etc.
  description: { type: String, default: "" },
  questions: [questionSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Test", testSchema);
