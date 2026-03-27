const express = require("express");
const router = express.Router();

const RoomController = require("../controllers/roomController");
const AuthMiddleware = require("../middleware/authMiddleware");
const AdminMiddleware = require("../middleware/adminMiddleware");

router.get("/", RoomController.getPublicRooms);

router.get(
  "/admin/list",
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
  "/:id",
  AuthMiddleware.authenticate,
  AdminMiddleware.onlyAdmin,
  RoomController.updateRoom,
);

router.patch(
  "/:id/toggle-availability",
  AuthMiddleware.authenticate,
  AdminMiddleware.onlyAdmin,
  RoomController.toggleAvailability,
);

router.patch(
  "/:id/deactivate",
  AuthMiddleware.authenticate,
  AdminMiddleware.onlyAdmin,
  RoomController.deactivateRoom,
);

module.exports = router;
