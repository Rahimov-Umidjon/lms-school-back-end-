const LessonPlan = require('../models/lessonPlan');

// 🔹 Barcha dars rejalarni olish
exports.getLessonPlans = async (req, res) => {
  try {
    const plans = await LessonPlan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Yangi dars rejasi qo‘shish (faqat admin)
exports.createLessonPlan = async (req, res) => {
  // if (req.user.role !== 'admin') {
  //   return res.status(403).json({ message: 'Ruxsat berilmagan' });
  // }

  try {
    const newPlan = new LessonPlan(req.body);
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
