const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// 🔥 Barcha foydalanuvchilarni olish
exports.getAllUsers = async (req, res) => {
  console.log('So\'rov kelib tushdi');
  try {
      const users = await User.find();  // Barcha foydalanuvchilarni olish
      console.log('Foydalanuvchilar:', users);  // Foydalanuvchilarni ko'rsatish
      res.status(200).json(users);  // Foydalanuvchilarni qaytarish
  } catch (error) {
      console.error('Xato:', error.message);  // Xato haqida log
      res.status(500).json({ message: error.message });  // Xato bo'lsa, 500 xato
  }
};

// 🔥 "role" maydoni "student" bo'lgan foydalanuvchilarni olish

exports.getStudents = async (req, res) => {
  try {
      // "role" maydoni "student" bo'lgan foydalanuvchilarni olish
      const teachers = await User.find({ role: 'student' });

      // Agar student bo'lsa, ularga response yuborish
      if (teachers.length > 0) {
          res.status(200).json(teachers);
      } else {
          res.status(404).json({ message: "student topilmadi" });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });  // Xato bo'lsa, 500 xato
  }
};

// 🔥 "role" maydoni "teacher" bo'lgan foydalanuvchilarni olish
exports.getTeachers = async (req, res) => {
  try {
      // "role" maydoni "teacher" bo'lgan foydalanuvchilarni olish
      const teachers = await User.find({ role: 'teacher' });

      // Agar teacherlar bo'lsa, ularga response yuborish
      if (teachers.length > 0) {
          res.status(200).json(teachers);
      } else {
          res.status(404).json({ message: "Teacherlar topilmadi" });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });  // Xato bo'lsa, 500 xato
  }
};


// "role" maydoni "leadership" bo'lgan foydalanuvchilarni olish
exports.getLeadership = async (req, res) => {
  try {
      // "role" maydoni "leadership" bo'lgan foydalanuvchilarni olish
      const leadership = await User.find({ role: 'leadership' });

      // Agar leadership bo'lsa, ularga response yuborish
      if (leadership.length > 0) {
          res.status(200).json(leadership);
      } else {
          res.status(404).json({ message: "leadership topilmadi" });
      }
  } catch (error) {
      res.status(500).json({ message: error.message });  // Xato bo'lsa, 500 xato
  }
};



// ✅ Register
exports.register = async (req, res) => {
     
  const {
    username,
    email,
    password,
    first_name,
    last_name,
    middle_name,
    birth_date,
    gender,
    rating_book,
    address,
    degree,
    specialization,
    role,
    image,
    title
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      first_name,
      last_name,
      middle_name,
      birth_date,
      gender,
      rating_book,
      address,
      degree,
      specialization,
      role,
      image,
      title
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: "3h" });

    res.status(201).json({
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        role: savedUser.role,
        full_name: `${savedUser.last_name} ${savedUser.first_name}`,
        token,
        message: "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi"
      }
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Ro'yxatdan o'tishda xatolik" });
  }
};

// ✅ Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Email yoki parol noto‘g‘ri" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Email yoki parol noto‘g‘ri" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3h" });

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        full_name: `${user.last_name} ${user.first_name}`,
        ...(user.role === "student"  && {class : user.class}),
        token,
        message: "Kirish muvaffaqiyatli"
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Kirishda xatolik" });
  }
};

// ✅ /me route
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ error: "Foydalanuvchi topilmadi" });

    res.json(user);
  } catch (error) {
    console.error("Me error:", error);
    res.status(500).json({ error: "Foydalanuvchini olishda xatolik" });
  }
};



