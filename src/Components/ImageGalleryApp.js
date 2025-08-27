import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ImageGalleryApp.css";

const ImageGalleryApp = () => {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/images");
      setImages(res.data);
    } catch (err) {
      console.error("Fetch error:", err.response || err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e) => setFiles(e.target.files);
// handleUpload function mein:
const handleUpload = async () => {
  if (!files || files.length === 0) return;
  const formData = new FormData();

  // Yeh line multiple files ke liye:
  for (let i = 0; i < files.length; i++) {
    formData.append("image", files[i]); // Multiple files same name se append karo
  }

  try {
    setLoading(true);
    const res = await axios.post(
      "http://localhost:5000/api/images/upload",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    
    // Multiple images response handle karo:
    if (res.data.images) {
      setImages(prev => [...res.data.images, ...prev]);
    }
    setFiles([]);
  } catch (err) {
    console.error("Upload error:", err);
    alert("Failed to upload images");
  } finally {
    setLoading(false);
  }
};

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/images/${id}`);
      setImages(images.filter(img => img.id !== id));
    } catch (err) {
      console.error("Delete error:", err.response || err);
    }
  };

  return (
    <div className="gallery-container">
      <h2>Image Upload & Gallery</h2>

      <div className="upload-section">
        <input type="file" multiple onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <div className="gallery-grid">
        {images.map(img => (
          <div key={img.id} className="image-card">
            <img src={`http://localhost:5000${img.path}`} alt={img.name} />
            <p>{img.name}</p>
            <button onClick={() => handleDelete(img.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGalleryApp;
