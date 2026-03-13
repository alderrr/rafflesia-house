require("dotenv").config();

const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Rafflesia House API Running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
