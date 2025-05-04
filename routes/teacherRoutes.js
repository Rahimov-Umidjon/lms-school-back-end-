const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const auth = require("../middleware/authMiddleware");

// CRUD routes
router.post("/", auth, teacherController.createTeacher);
router.get("/", auth, teacherController.getAllTeachers);
router.get("/:id", auth, teacherController.getTeacherById);
router.put("/:id", auth, teacherController.updateTeacher);
router.delete("/:id", auth, teacherController.deleteTeacher);

module.exports = router;
