const Course = require("../models/Course");

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({
      message: "All courses taken ✅",
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while taking courses ❌",
      error: error.message,
    });
  }
};

const createCourse = async (req, res) => {
  const { title, description } = req.body;
  try {
    const course = new Course({ title, description });
    await course.save();
    res.status(201).json({
      message: "Course created successfully ✅",
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating course ❌",
      error: error.message,
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!course)
      return res.status(404).json({ message: "Course not found ❌" });

    res.json({
      message: "Course updated successfully ✅",
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating course ❌",
      error: error.message,
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course)
      return res.status(404).json({
        message: "Course not found ❌",
      });

    res.json({
      message: "Course successfully deleted ✅",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting course ❌",
      error: error.message,
    });
  }
};

module.exports = { getCourses, createCourse, updateCourse, deleteCourse };
