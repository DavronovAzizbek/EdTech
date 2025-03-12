const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const Student = require("../models/Student");

const getPopularCourses = async (req, res) => {
  try {
    const popularCourses = await Enrollment.aggregate([
      { $group: { _id: "$courseId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "courses",
          localField: "_id",
          foreignField: "_id",
          as: "courseInfo",
        },
      },
      { $unwind: "$courseInfo" },
      { $project: { title: "$courseInfo.title", count: 1 } },
    ]);

    res.json({
      message: "The list of the most popular courses has been obtained! ✅",
      popularCourses,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to retrieve the list of popular courses! ❌",
      error: err.message,
    });
  }
};

const getProgress = async (req, res) => {
  try {
    const totalEnrollments = await Enrollment.countDocuments();
    const totalStudents = await Student.countDocuments();
    const totalCourses = await Course.countDocuments();

    if (totalStudents === 0 || totalCourses === 0) {
      return res.json({
        message: "No students or courses found, progress is 0%. ❌",
        progress: "0.00%",
        averageCoursesPerStudent: 0,
      });
    }

    const averageCoursesPerStudent = totalEnrollments / totalStudents;
    const maxPossibleEnrollments = totalStudents * totalCourses;
    const progress = (totalEnrollments / maxPossibleEnrollments) * 100;

    res.json({
      message: "Progress data has been successfully calculated! ✅",
      progress: progress.toFixed(2) + "%",
      averageCoursesPerStudent: averageCoursesPerStudent.toFixed(2),
      totalEnrollments,
      totalStudents,
      totalCourses,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to calculate progress data! ❌",
      error: err.message,
    });
  }
};

module.exports = { getPopularCourses, getProgress };
