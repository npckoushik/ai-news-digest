import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  title: String,
  content: String,
  topic: String,
  summary: String,
  publishedAt: Date
});

export default mongoose.model("Article", ArticleSchema);
