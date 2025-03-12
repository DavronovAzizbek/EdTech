const express = require("express");
const router = express.Router();
const {
  getPopularCourses,
  getProgress,
} = require("../controllers/analyticsController");

router.get("/popular", getPopularCourses);
router.get("/progress", getProgress);

module.exports = router;
