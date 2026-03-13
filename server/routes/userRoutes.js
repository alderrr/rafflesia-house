const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");
const AuthMiddleware = require("../middleware/authMiddleware");
const AdminMiddleware = require("../middleware/adminMiddleware");

router.post(
  "/",
  AuthMiddleware.authenticate,
  AdminMiddleware.onlyAdmin,
  UserController.createUser,
);

router.get(
  "/",
  AuthMiddleware.authenticate,
  AdminMiddleware.onlyAdmin,
  UserController.getUsers,
);

router.put(
  "/:id",
  AuthMiddleware.authenticate,
  AdminMiddleware.onlyAdmin,
  UserController.updateUsers,
);

router.delete(
  "/:id",
  AuthMiddleware.authenticate,
  AdminMiddleware.onlyAdmin,
  UserController.deleteUsers,
);

module.exports = router;
