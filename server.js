import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import booksRoutes from "./routes/bookRoutes.js";
import blogsRoutes from "./routes/blogRoutes.js";

dotenv.config();

const app = express();

// Allow only specific origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://blog-frontend-zq17.vercel.app/"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/books", booksRoutes);
app.use("/blogs", blogsRoutes);

// Root route
app.get("/", (_req, res) => res.send("API is running..."));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
