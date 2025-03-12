const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

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
      data: popularCourses,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error! There was a problem retrieving the course list ❌",
      error: err.message,
    });
  }
};

const getProgress = async (req, res) => {
  try {
    const totalEnrollments = await Enrollment.countDocuments();
    const uniqueStudents = await Enrollment.distinct("studentId").then(
      (students) => students.length
    );
    const totalCourses = await Course.countDocuments();

    const progress =
      totalEnrollments > 0 && totalCourses > 0
        ? (totalEnrollments / (uniqueStudents * totalCourses)) * 100
        : 0;

    res.json({
      message: "The level of mastery has been calculated! ✅",
      progress: progress.toFixed(2) + "%",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error! There was a problem calculating the mastery level ❌",
      error: err.message,
    });
  }
};

module.exports = { getPopularCourses, getProgress };
