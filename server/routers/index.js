const authController = require("../controllers/authController");
const guestController = require("../controllers/guestController");
const roomController = require("../controllers/roomController");
const authentication = require("../middlewares/authentication");
const router = require("express").Router();

// PUBLIC ROUTES
router.post("/api/admin/login", authController.loginAdmin);

// PROTECTED ROUTES
router.use("/api/admin", authentication);

// ADMIN USERS
router.post("/api/admin/users", authController.registerAdmin);
router.get("/api/admin/users", authController.getAdmins);
router.get("/api/admin/users/:id", authController.getAdmin);
router.delete("/api/admin/users/:id", authController.deleteAdmin);

// ADMIN GUESTS
router.post("/api/admin/guests", guestController.createGuest);
router.get("/api/admin/guests", guestController.getGuests);
router.get("/api/admin/guests/:id", guestController.getGuest);
router.put("/api/admin/guests/:id", guestController.updateGuest);
router.delete("/api/admin/guests/:id", guestController.deleteGuest);

// ADMIN ROOMS
router.post("/api/admin/rooms", roomController.createRoom);
router.get("/api/admin/rooms", roomController.getRooms);
router.get("/api/admin/rooms/:id", roomController.getRoom);
router.put("/api/admin/rooms/:id", roomController.updateRoom);
router.delete("/api/admin/rooms/:id", roomController.deleteRoom);

// PUBLIC ROOMS
router.get("/api/public/rooms", roomController.getPublicRooms);
router.get("/api/public/rooms/:id", roomController.getRoom);

module.exports = router;
