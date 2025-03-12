const Student = require("../models/Student");
const Enrollment = require("../models/Enrollment");

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.json({
      message: "Student list received ✅",
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while retrieving students ❌",
      error: error.message,
    });
  }
};

const getStudentCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      studentId: req.params.id,
    }).populate("courseId");
    if (!enrollments.length)
      return res.status(404).json({
        message: "This student is not enrolled in any courses ❌",
      });
    const courses = enrollments.map((e) => e.courseId);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createStudent = async (req, res) => {
  const { name, email } = req.body;

  try {
    const student = new Student({ name, email });
    await student.save();
    res.status(201).json({
      message: "New student created successfully ✅",
      data: student,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating student ❌",
      error: error.message,
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!student)
      return res.status(404).json({ message: "No student found  ❌" });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student)
      return res.status(404).json({ message: "No student found ❌" });
    res.json({ message: "Student deleted ✅" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getStudents,
  getStudentCourses,
  createStudent,
  updateStudent,
  deleteStudent,
};
