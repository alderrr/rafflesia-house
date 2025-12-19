const authController = require("../controllers/authController");
const authentication = require("../middlewares/authentication");
const router = require("express").Router();

router.post("/api/admin/login", authController.loginAdmin);
router.use(authentication);
router.post("/api/admin/register", authController.registerAdmin);
router.get("/api/admin/get/all", authController.getAdmins);
router.get("/api/admin/get/:id", authController.getAdmin);
router.post("/api/admin/delete/:id", authController.deleteAdmin);

module.exports = router;
