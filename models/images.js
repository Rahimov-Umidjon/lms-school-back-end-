const mongoose = require("mongoose");

const SchoolGallerySchema = new mongoose.Schema({
    image: { type: String },
    title: { type: String }
});

module.exports = mongoose.model("school_gallery", SchoolGallerySchema);
