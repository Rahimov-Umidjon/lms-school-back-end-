const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  fullName: { type: String, required: true },              // F.I.SH
  birthDate: { type: Date, required: true },               // Tug‘ilgan sana
  gender: { type: String, enum: ["Erkak", "Ayol"], required: true }, // Jinsi
  rating: { type: Number, default: 0 },                    // Reyting
  notebook: { type: String },                              // Daftarcha
  address: { type: String },                               // Manzil
  level: { type: String },                                 // Darajasi
  specialization: { type: String },                        // Yo‘nalish
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  photo: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Teacher", TeacherSchema);
