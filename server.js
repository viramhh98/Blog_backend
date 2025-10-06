import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import booksRoutes from "./routes/bookRoutes.js";
import blogsRoutes from "./routes/blogRoutes.js"; // add blogs

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173","https://blog-frontend-q437.vercel.app/blogs"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/books", booksRoutes);
app.use("/blogs", blogsRoutes); // blogs routes

// Default route
app.get("/", (_req, res) => res.send("API is running..."));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
