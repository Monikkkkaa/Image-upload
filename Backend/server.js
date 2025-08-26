const express = require("express");
const cors = require("cors");
const path = require("path");
const imageRoutes = require("./routes/imageRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Make uploads folder public
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/images", imageRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
