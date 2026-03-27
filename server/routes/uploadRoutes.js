const express = require("express");
const router = express.Router();

const UploadController = require("../controllers/uploadController");
const AuthMiddleware = require("../middleware/authMiddleware");
const AdminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post(
  "/room-image",
  AuthMiddleware.authenticate,
  AdminMiddleware.onlyAdmin,
  upload.single("image"),
  UploadController.uploadRoomImage,
);

module.exports = router;
