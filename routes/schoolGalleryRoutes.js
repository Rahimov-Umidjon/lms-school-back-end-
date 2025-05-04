const express = require("express");
const router = express.Router();

const {getAllGallery} = require('../controllers/schoolGalleryController');
router.get("", getAllGallery );

module.exports = router;