const Student = require("../models/Student");

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

module.exports = { getStudents, createStudent };
