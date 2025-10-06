import express from "express";
import {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

const router = express.Router();

router.post("/", addBook);       // Create
router.get("/", getBooks);       // Read all
router.get("/:id", getBookById); // Read one
router.put("/:id", updateBook);  // Update
router.delete("/:id", deleteBook); // Delete

export default router;
