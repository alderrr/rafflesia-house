const authController = require("../controllers/authController");
const authentication = require("../middlewares/authentication");
const router = require("express").Router();

router.post("/api/admin/register", authController.registerAdmin);
router.post("/api/admin/login", authController.loginAdmin);

// router.use(authentication);

module.exports = router;
