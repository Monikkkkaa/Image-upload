const db = require("../config/db");

exports.uploadImage = (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded!" });

  const { name } = req.body; 
  const imageName = name || req.file.originalname; 
  const filePath = `/uploads/${req.file.filename}`;


  const sql = "INSERT INTO images (name, path) VALUES (?, ?)";
  db.query(sql, [imageName, filePath], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.json({ 
      message: "Image uploaded successfully", 
      id: result.insertId, 
      name: imageName, 
      path: filePath
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
