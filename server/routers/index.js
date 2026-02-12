const authController = require("../controllers/authController");
const guestController = require("../controllers/guestController");
const roomController = require("../controllers/roomController");
const tenantController = require("../controllers/tenantController");
const dashboardController = require("../controllers/dashboardController");
const paymentController = require("../controllers/paymentController");
const reportController = require("../controllers/reportController");
const authentication = require("../middlewares/authentication");
const router = require("express").Router();

// PUBLIC ROUTES
router.post("/api/admin/login", authController.loginAdmin);

// PROTECTED ROUTES
router.use("/api/admin", authentication);

// ADMIN DASHBOARD
router.get("/api/admin/dashboard", dashboardController.getDashboard);

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

// ADMIN TENANTS
router.post("/api/admin/tenants", tenantController.createTenant);
router.get("/api/admin/tenants", tenantController.getTenants);
router.get("/api/admin/tenants/:id", tenantController.getTenant);
router.patch("/api/admin/tenants/:id", tenantController.checkoutTenant);
router.delete("/api/admin/tenants/:id", tenantController.deleteTenant);

// ADMIN PAYMENTS
router.post("/api/admin/payments", paymentController.createPayment);
router.get("/api/admin/payments", paymentController.getPayments);
router.get(
  "/api/admin/tenants/:id/payments",
  paymentController.getTenantPayments,
);

// ADMIN REPORTS
router.get("/api/admin/reports/financial", reportController.financialSummary);

// PUBLIC ROOMS
router.get("/api/public/rooms", roomController.getPublicRooms);
router.get("/api/public/rooms/:id", roomController.getRoom);

module.exports = router;
