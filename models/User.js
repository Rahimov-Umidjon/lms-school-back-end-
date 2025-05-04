const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  title: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  middle_name: { type: String },
  birth_date: { type: Date },
  gender: { type: String, enum: ["male", "female"] },
  rating_book: { type: Number, min: 1.0, max: 5.0 },
  address: { type: String },
  degree: { type: String },
  specialization: { type: String },
  role: { type: String, enum: ["admin", "student", "teacher","leadership"],  }
});

module.exports = mongoose.model("User", UserSchema);
