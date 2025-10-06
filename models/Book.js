import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  summary: { type: String, required: true, trim: true },
  category: { type: String, trim: true },
  tags: { type: [String], default: [] },
  image: { type: String, default: "" },
  buyLink: { type: String, default: "" },
  date: { type: Date, default: Date.now }
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
