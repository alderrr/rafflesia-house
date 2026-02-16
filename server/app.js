require("dotenv").config();

const router = require("./routers");
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const createIndexes = require("./config/createIndexes");
const cors = require("cors");
const { connectDB } = require("./config/db");

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors(),
  // {origin: ["http://localhost:3000"]}
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errorHandler);

connectDB()
  .then(() => {
    return createIndexes();
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error("Server failed to start:", err.message);
    process.exit(1);
  });
