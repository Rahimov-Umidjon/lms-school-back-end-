const Teacher = require("../models/Teacher");

// ➕ Yangi o‘qituvchi qo‘shish
exports.createTeacher = async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body);
    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (err) {
    res.status(400).json({ error: "Xatolik: " + err.message });
  }
};

// 🔁 Barcha o‘qituvchilarni olish
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ error: "Server xatolik: " + err.message });
  }
};

// 🔍 Bitta o‘qituvchini ID orqali olish
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ error: "Topilmadi" });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ O‘qituvchini yangilash
exports.updateTeacher = async (req, res) => {
  try {
    const updated = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ❌ O‘chirish
exports.deleteTeacher = async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: "O‘chirilgan" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
