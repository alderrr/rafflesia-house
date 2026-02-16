const authController = require("../controllers/authController");
const guestController = require("../controllers/guestController");
const roomController = require("../controllers/roomController");
const tenantController = require("../controllers/tenantController");
const dashboardController = require("../controllers/dashboardController");
const paymentController = require("../controllers/paymentController");
const reportController = require("../controllers/reportController");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const router = require("express").Router();

// HEALTH CHECK
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

// PUBLIC ROUTES
router.post("/api/v1/admin/login", authController.loginAdmin);

// PROTECTED ROUTES
router.use("/api/v1/admin", authentication);

// ADMIN DASHBOARD
router.get(
  "/api/v1/admin/dashboard",
  authorization(["owner", "staff"]),
  dashboardController.getDashboard,
);

// ADMIN USERS
router.post(
  "/api/v1/admin/users",
  authorization(["owner"]),
  authController.registerAdmin,
);
router.get(
  "/api/v1/admin/users",
  authorization(["owner"]),
  authController.getAdmins,
);
router.get(
  "/api/v1/admin/users/:id",
  authorization(["owner"]),
  authController.getAdmin,
);
router.delete(
  "/api/v1/admin/users/:id",
  authorization(["owner"]),
  authController.deleteAdmin,
);

// ADMIN GUESTS
router.post(
  "/api/v1/admin/guests",
  authorization(["owner", "staff"]),
  guestController.createGuest,
);
router.get(
  "/api/v1/admin/guests",
  authorization(["owner", "staff"]),
  guestController.getGuests,
);
router.get(
  "/api/v1/admin/guests/:id",
  authorization(["owner", "staff"]),
  guestController.getGuest,
);
router.put(
  "/api/v1/admin/guests/:id",
  authorization(["owner", "staff"]),
  guestController.updateGuest,
);
router.delete(
  "/api/v1/admin/guests/:id",
  authorization(["owner"]),
  guestController.deleteGuest,
);

// ADMIN ROOMS
router.post(
  "/api/v1/admin/rooms",
  authorization(["owner"]),
  roomController.createRoom,
);
router.get(
  "/api/v1/admin/rooms",
  authorization(["owner", "staff"]),
  roomController.getRooms,
);
router.get(
  "/api/v1/admin/rooms/:id",
  authorization(["owner", "staff"]),
  roomController.getRoom,
);
router.put(
  "/api/v1/admin/rooms/:id",
  authorization(["owner"]),
  roomController.updateRoom,
);
router.delete(
  "/api/v1/admin/rooms/:id",
  authorization(["owner"]),
  roomController.deleteRoom,
);

// ADMIN TENANTS
router.post(
  "/api/v1/admin/tenants",
  authorization(["owner", "staff"]),
  tenantController.createTenant,
);
router.get(
  "/api/v1/admin/tenants",
  authorization(["owner", "staff"]),
  tenantController.getTenants,
);
router.get(
  "/api/v1/admin/tenants/:id",
  authorization(["owner", "staff"]),
  tenantController.getTenant,
);
router.patch(
  "/api/v1/admin/tenants/:id",
  authorization(["owner", "staff"]),
  tenantController.checkoutTenant,
);
router.delete(
  "/api/v1/admin/tenants/:id",
  authorization(["owner"]),
  tenantController.deleteTenant,
);

// ADMIN PAYMENTS
router.post(
  "/api/v1/admin/payments",
  authorization(["owner", "staff"]),
  paymentController.createPayment,
);
router.get(
  "/api/v1/admin/payments",
  authorization(["owner", "staff"]),
  paymentController.getPayments,
);
router.get(
  "/api/v1/admin/tenants/:id/payments",
  authorization(["owner", "staff"]),
  paymentController.getTenantPayments,
);

// ADMIN REPORTS
router.get(
  "/api/v1/admin/reports/financial",
  authorization(["owner"]),
  reportController.financialSummary,
);

// PUBLIC ROOMS
router.get("/api/v1/public/rooms", roomController.getPublicRooms);
router.get("/api/v1/public/rooms/:id", roomController.getRoom);

module.exports = router;
