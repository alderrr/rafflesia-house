const express = require("express");
const router = express.Router();

const RoomController = require("../controllers/roomController");
const AuthMiddleware = require("../middleware/authMiddleware");
const AdminMiddleware = require("../middleware/adminMiddleware");

router.get("/", RoomController.getPublicRooms);

router.get(
  "/admin",
  AuthMiddleware.authenticate,
  AdminMiddleware.onlyAdmin,
  RoomController.getAdminRooms,
);

router.get("/:id", RoomController.getRoomById);

router.post(
  "/",
  AuthMiddleware.authenticate,
  AdminMiddleware.onlyAdmin,
  RoomController.createRoom,
);
router.put(
  "/",
  AuthMiddleware.authenticate,
  AdminMiddleware.onlyAdmin,
  RoomController.updateRoom,
);
router.delete(
  "/",
  AuthMiddleware.authenticate,
  AdminMiddleware.onlyAdmin,
  RoomController.deleteRoom,
);

module.exports = router;
