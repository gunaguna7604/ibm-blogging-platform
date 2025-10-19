const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Database Connection Error:", err));

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.sendFile(__dirname + "/public/index.html"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
