const Gallery = require('../models/images')


// exports.getAllGallery = async (req, res) => {
//   try {
//     const gallery = await Gallery.find();
//     res.json(gallery);
//   } catch (err) {
//     res.status(500).json({ error: "Server xatolik: " + err.message });
//   }
// };

exports.getAllGallery = async (req, res) => {
  console.log('So\'rov kelib tushdi');
  try {
      const gallery = await Gallery.find();  // Barcha foydalanuvchilarni olish
      console.log('Foydalanuvchilar:', gallery);  // Foydalanuvchilarni ko'rsatish
      res.status(200).json(gallery);  // Foydalanuvchilarni qaytarish
  } catch (error) {
      console.error('Xato:', error.message);  // Xato haqida log
      res.status(500).json({ message: error.message });  // Xato bo'lsa, 500 xato
  }
};