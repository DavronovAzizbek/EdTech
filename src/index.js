const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

const courseRoutes = require("./routes/courses");
const studentRoutes = require("./routes/students");
const enrollmentRoutes = require("./routes/enrollments");
const analyticsRoutes = require("./routes/analytics");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/auth");

app.use("/api/auth", authRoutes);
app.use("/api/courses", authMiddleware, courseRoutes);
app.use("/api/students", authMiddleware, studentRoutes);
app.use("/api/enrollments", authMiddleware, enrollmentRoutes);
app.use("/api/analytics", authMiddleware, analyticsRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT} 🚀`);
});
