import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import booksRoutes from "./routes/bookRoutes.js";
import blogsRoutes from "./routes/blogRoutes.js";

dotenv.config();
const app = express();

// ✅ Allow only specific origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://blog-frontend-zq17.vercel.app" // ❌ removed trailing slash — important
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
  credentials: true,
}));

app.use(express.json());

// ✅ MongoDB connection with status logs
mongoose.connection.on("connected", () => console.log("✅ MongoDB connected successfully"));
mongoose.connection.on("error", (err) => console.error("❌ MongoDB connection error:", err));
mongoose.connection.on("disconnected", () => console.warn("⚠️ MongoDB disconnected"));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connection established");

    // ✅ Start server *after* DB connects
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // Stop the app if DB fails
  }
};

// ✅ Connect to DB
connectDB();

// Routes
app.use("/books", booksRoutes);
app.use("/blogs", blogsRoutes);

// Root route
app.get("/", (_req, res) => res.send("API is running..."));
