require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const schoolGalleryRoutes = require('./routes/schoolGalleryRoutes')

const app = express();
const PORT = process.env.PORT || 5000;


// const userRoutes = require("./routes/userRoutes");
// app.use("/api/users", userRoutes); // 🔥 MUHIM



// MongoDBga ulanish
connectDB();

// Middlewarelar
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/teachers", teacherRoutes);
app.use("/api/users", userRoutes);
app.use("/api/school_gallery", schoolGalleryRoutes);
 

// Serverni ishga tushirish
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
