const express = require("express");
const router = express.Router();
const {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentCourses,
} = require("../controllers/studentController");

router.get("/", getStudents);
router.get("/:id/courses", getStudentCourses);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
