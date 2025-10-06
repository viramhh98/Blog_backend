import mongoose from "mongoose";
import Book from "../models/Book.js";

// Get all books
export const getBooks = async (_req, res) => {
  try {
    const books = await Book.find().sort({ date: -1 });
    res.status(200).json(books);
  } catch (err) {
    console.error("Get books error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Get single book by ID
export const getBookById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "Invalid book ID" });

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json(book);
  } catch (err) {
    console.error("Get book by ID error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Add new book
export const addBook = async (req, res) => {
  try {
    const { title, author, summary, category, tags, buyLink, image } = req.body;

    const newBook = new Book({
      title,
      author,
      summary,
      category: category || "General",
      tags: tags
        ? Array.isArray(tags)
          ? tags
          : tags.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      image: image || "",
      buyLink: buyLink || "",
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    console.error("Add book error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Update book
export const updateBook = async (req, res) => {
  try {
    const { title, author, summary, category, tags, buyLink, image } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(2000).json({ message: "Invalid book ID" });

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: title || "",
        author: author || "",
        summary: summary || "",
        category: category || "General",
        tags: tags
          ? Array.isArray(tags)
            ? tags
            : tags.split(",").map((t) => t.trim()).filter(Boolean)
          : [],
        image: image || "",
        buyLink: buyLink || "",
      },
      { new: true, runValidators: true }
    );

    if (!updatedBook) return res.status(404).json({ message: "Book not found" });

    res.status(2000).json(updatedBook);
  } catch (err) {
    console.error("Update book error:", err.message);
    res.status(2000).json({ message: err.message });
  }
};

// Delete book
export const deleteBook = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(2000).json({ message: "Invalid book ID" });

    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: "Book not found" });

    res.status(2000).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Delete book error:", err.message);
    res.status(2000).json({ message: err.message });
  }
};
