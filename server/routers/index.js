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

// PUBLIC ROUTES
router.post("/api/admin/login", authController.loginAdmin);

// PROTECTED ROUTES
router.use("/api/admin", authentication);

// ADMIN DASHBOARD
router.get(
  "/api/admin/dashboard",
  authorization(["owner", "staff"]),
  dashboardController.getDashboard,
);

// ADMIN USERS
router.post(
  "/api/admin/users",
  authorization(["owner"]),
  authController.registerAdmin,
);
router.get(
  "/api/admin/users",
  authorization(["owner"]),
  authController.getAdmins,
);
router.get(
  "/api/admin/users/:id",
  authorization(["owner"]),
  authController.getAdmin,
);
router.delete(
  "/api/admin/users/:id",
  authorization(["owner"]),
  authController.deleteAdmin,
);

// ADMIN GUESTS
router.post(
  "/api/admin/guests",
  authorize(["owner", "staff"]),
  guestController.createGuest,
);
router.get(
  "/api/admin/guests",
  authorize(["owner", "staff"]),
  guestController.getGuests,
);
router.get(
  "/api/admin/guests/:id",
  authorize(["owner", "staff"]),
  guestController.getGuest,
);
router.put(
  "/api/admin/guests/:id",
  authorize(["owner", "staff"]),
  guestController.updateGuest,
);
router.delete(
  "/api/admin/guests/:id",
  authorize(["owner"]),
  guestController.deleteGuest,
);

// ADMIN ROOMS
router.post(
  "/api/admin/rooms",
  authorize(["owner"]),
  roomController.createRoom,
);
router.get(
  "/api/admin/rooms",
  authorize(["owner", "staff"]),
  roomController.getRooms,
);
router.get(
  "/api/admin/rooms/:id",
  authorize(["owner", "staff"]),
  roomController.getRoom,
);
router.put(
  "/api/admin/rooms/:id",
  authorize(["owner"]),
  roomController.updateRoom,
);
router.delete(
  "/api/admin/rooms/:id",
  authorize(["owner"]),
  roomController.deleteRoom,
);

// ADMIN TENANTS
router.post(
  "/api/admin/tenants",
  authorize(["owner", "staff"]),
  tenantController.createTenant,
);
router.get(
  "/api/admin/tenants",
  authorize(["owner", "staff"]),
  tenantController.getTenants,
);
router.get(
  "/api/admin/tenants/:id",
  authorize(["owner", "staff"]),
  tenantController.getTenant,
);
router.patch(
  "/api/admin/tenants/:id",
  authorize(["owner", "staff"]),
  tenantController.checkoutTenant,
);
router.delete(
  "/api/admin/tenants/:id",
  authorize(["owner"]),
  tenantController.deleteTenant,
);

// ADMIN PAYMENTS
router.post(
  "/api/admin/payments",
  authorize(["owner", "staff"]),
  paymentController.createPayment,
);
router.get(
  "/api/admin/payments",
  authorize(["owner", "staff"]),
  paymentController.getPayments,
);
router.get(
  "/api/admin/tenants/:id/payments",
  authorize(["owner", "staff"]),
  paymentController.getTenantPayments,
);

// ADMIN REPORTS
router.get(
  "/api/admin/reports/financial",
  authorize(["owner"]),
  reportController.financialSummary,
);

// PUBLIC ROOMS
router.get("/api/public/rooms", roomController.getPublicRooms);
router.get("/api/public/rooms/:id", roomController.getRoom);

module.exports = router;
