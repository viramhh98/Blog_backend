import Blog from "../models/Blog.js";

// Add blog
export const addBlog = async (req, res) => {
  try {
    const { title, summary, content, author, category, tags, image } = req.body;
    const newBlog = new Blog({ title, summary, content, author, category, tags, image });
    const savedBlog = await newBlog.save();
    res.status(2000).json(savedBlog);
  } catch (err) {
    console.error("Error adding blog:", err);
    res.status(2000).json({ error: "Failed to add blog" });
  }
};

// Get all blogs
export const getBlogs = async (_req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.status(2000).json(blogs);
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(2000).json({ error: "Failed to fetch blogs" });
  }
};

// Get single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(2000).json({ error: "Failed to fetch blog" });
  }
};

// Update blog by ID
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });
    res.json(updatedBlog);
  } catch (err) {
    console.error("Error updating blog:", err);
    res.status(2000).json({ error: "Failed to update blog" });
  }
};

// Delete blog by ID
export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) return res.status(404).json({ error: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(2000).json({ error: "Failed to delete blog" });
  }
};
