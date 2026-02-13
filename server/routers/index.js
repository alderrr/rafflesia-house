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
  authorization(["owner", "staff"]),
  guestController.createGuest,
);
router.get(
  "/api/admin/guests",
  authorization(["owner", "staff"]),
  guestController.getGuests,
);
router.get(
  "/api/admin/guests/:id",
  authorization(["owner", "staff"]),
  guestController.getGuest,
);
router.put(
  "/api/admin/guests/:id",
  authorization(["owner", "staff"]),
  guestController.updateGuest,
);
router.delete(
  "/api/admin/guests/:id",
  authorization(["owner"]),
  guestController.deleteGuest,
);

// ADMIN ROOMS
router.post(
  "/api/admin/rooms",
  authorization(["owner"]),
  roomController.createRoom,
);
router.get(
  "/api/admin/rooms",
  authorization(["owner", "staff"]),
  roomController.getRooms,
);
router.get(
  "/api/admin/rooms/:id",
  authorization(["owner", "staff"]),
  roomController.getRoom,
);
router.put(
  "/api/admin/rooms/:id",
  authorization(["owner"]),
  roomController.updateRoom,
);
router.delete(
  "/api/admin/rooms/:id",
  authorization(["owner"]),
  roomController.deleteRoom,
);

// ADMIN TENANTS
router.post(
  "/api/admin/tenants",
  authorization(["owner", "staff"]),
  tenantController.createTenant,
);
router.get(
  "/api/admin/tenants",
  authorization(["owner", "staff"]),
  tenantController.getTenants,
);
router.get(
  "/api/admin/tenants/:id",
  authorization(["owner", "staff"]),
  tenantController.getTenant,
);
router.patch(
  "/api/admin/tenants/:id",
  authorization(["owner", "staff"]),
  tenantController.checkoutTenant,
);
router.delete(
  "/api/admin/tenants/:id",
  authorization(["owner"]),
  tenantController.deleteTenant,
);

// ADMIN PAYMENTS
router.post(
  "/api/admin/payments",
  authorization(["owner", "staff"]),
  paymentController.createPayment,
);
router.get(
  "/api/admin/payments",
  authorization(["owner", "staff"]),
  paymentController.getPayments,
);
router.get(
  "/api/admin/tenants/:id/payments",
  authorization(["owner", "staff"]),
  paymentController.getTenantPayments,
);

// ADMIN REPORTS
router.get(
  "/api/admin/reports/financial",
  authorization(["owner"]),
  reportController.financialSummary,
);

// PUBLIC ROOMS
router.get("/api/public/rooms", roomController.getPublicRooms);
router.get("/api/public/rooms/:id", roomController.getRoom);

module.exports = router;
