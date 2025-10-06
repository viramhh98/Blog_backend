import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog title is required"],
    trim: true,
  },
  summary: {
    type: String,
    required: [true, "Summary is required"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  author: {
    type: String,
    required: [true, "Author name is required"],
    trim: true,
  },
  category: {
    type: String,
    trim: true,
    default: "General",
  },
  tags: {
    type: [String],
    default: [],
  },
  image: {
    type: String,
    default: "", // fallback if no image is provided
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for a URL-friendly slug
blogSchema.virtual("slug").get(function () {
  return this.title.toLowerCase().replace(/\s+/g, "-");
});

// Optional: Index for faster search by title or tags
blogSchema.index({ title: "text", tags: "text" });

export default mongoose.model("Blog", blogSchema);
