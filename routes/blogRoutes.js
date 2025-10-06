import express from "express";
import {
  getBlogs,
  addBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";

const router = express.Router();

// Blog routes
router.get("/", getBlogs);
router.post("/", addBlog);
router.get("/:id", getBlogById);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
