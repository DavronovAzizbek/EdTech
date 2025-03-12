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

app.use("/api/courses", courseRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/analytics", analyticsRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT} 🚀`);
});
