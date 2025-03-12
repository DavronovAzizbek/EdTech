const express = require("express");
const router = express.Router();
const { createEnrollment } = require("../controllers/enrollmentController");

router.post("/", createEnrollment);

module.exports = router;
