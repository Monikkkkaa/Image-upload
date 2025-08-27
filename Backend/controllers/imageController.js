const db = require("../config/db");

exports.uploadImage = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded!" });
  }

  const uploadedImages = [];
  let processedCount = 0;

  req.files.forEach((file) => {
    const imageName = file.originalname;
    const filePath = `/uploads/${file.filename}`;

    const sql = "INSERT INTO images (name, path) VALUES (?, ?)";
    db.query(sql, [imageName, filePath], (err, result) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });
      
      uploadedImages.push({
        id: result.insertId,
        name: imageName,
        path: filePath
      });

      processedCount++;
      
      if (processedCount === req.files.length) {
        res.json({
          message: "Images uploaded successfully",
          images: uploadedImages
        });
      }
    });
  });
};

exports.getImages = (req, res) => {
  const sql = "SELECT * FROM images ORDER BY uploaded_at DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.json(results);
  });
};

exports.deleteImage = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM images WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.json({ message: "Image deleted successfully" });
  });
};