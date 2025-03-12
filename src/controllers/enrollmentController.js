const Enrollment = require("../models/Enrollment");
const Student = require("../models/Student");
const Course = require("../models/Course");

const createEnrollment = async (req, res) => {
  const { studentId, courseId } = req.body;
  try {
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course) {
      return res.status(404).json({
        message: "Student or course not found ❌",
      });
    }

    const enrollment = new Enrollment({ studentId, courseId });
    await enrollment.save();

    res.status(201).json({
      message: "The student has successfully enrolled in the course ✅",
      data: enrollment,
    });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred during the write process ❌",
      error: error.message,
    });
  }
};

module.exports = { createEnrollment };
