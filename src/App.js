import React, { useState } from "react";
import ImageGalleryApp from "./Components/ImageGalleryApp";

function App() {
  const [images, setImages] = useState([]);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f7f9fc", padding: "20px" }}>
    
      <ImageGalleryApp/>
    </div>
  );
}

export default App;

