const express = require('express');
const router = express.Router();
const { getLessonPlans, createLessonPlan } = require('../controllers/lessonPlanController');
const authMiddleware = require('../middleware/authMiddleware');

// GET – dars rejalarni olish (ochiq)
router.get('/', getLessonPlans);

// POST – yangi dars rejasi qo‘shish (faqat admin)
router.post('/register', authMiddleware, createLessonPlan);

module.exports = router;
