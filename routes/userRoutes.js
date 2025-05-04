const express = require("express");
const router = express.Router();
const { register, login, getMe ,getAllUsers, getTeachers, getLeadership } = require("../controllers/userController");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticateToken, getMe);
router.get('/', getAllUsers);
router.get('/teachers', getTeachers)
router.get('/leadership', getLeadership)

module.exports = router;
