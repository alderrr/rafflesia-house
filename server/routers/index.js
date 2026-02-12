const authController = require("../controllers/authController");
const guestController = require("../controllers/guestController");
const roomController = require("../controllers/roomController");
const authentication = require("../middlewares/authentication");
const router = require("express").Router();

router.post("/api/admin/login", authController.loginAdmin);
router.use(authentication);
router.post("/api/admin/user/register", authController.registerAdmin);
router.get("/api/admin/user/get/all", authController.getAdmins);
router.get("/api/admin/user/get/:id", authController.getAdmin);
router.post("/api/admin/user/delete", authController.deleteAdmin);
router.post("/api/admin/user/delete/:id", authController.deleteAdmin);

router.post("/api/admin/guest/create", guestController.createGuest);
router.get("/api/admin/guest/get/all", guestController.getGuests);
router.get("/api/admin/guest/get/:id", guestController.getGuest);
router.post("/api/admin/guest/update/:id", guestController.updateGuest);
router.post("/api/admin/guest/delete/:id", guestController.deleteGuest);

// ADMIN ROOMS
router.post("/api/admin/rooms", roomController.createRoom);
router.get("/api/admin/rooms", roomController.getRooms);
router.get("/api/admin/rooms/:id", roomController.getRoom);
router.put("/api/admin/rooms/:id", roomController.updateRoom);
router.delete("/api/admin/rooms/:id", roomController.deleteRoom);

// PUBLIC
router.get("/api/public/rooms", roomController.getPublicRooms);

module.exports = router;
