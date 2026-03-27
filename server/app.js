require("dotenv").config();

const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/uploads", uploadRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({
    message: "Rafflesia House API Running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
