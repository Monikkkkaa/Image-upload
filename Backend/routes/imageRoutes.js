const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const imageController = require("../controllers/imageController");

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Routes
router.post("/upload", upload.array("image",10), imageController.uploadImage);
router.get("/", imageController.getImages);
router.delete("/:id", imageController.deleteImage);

module.exports = router;
