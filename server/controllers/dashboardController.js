const { getDB } = require("../config/db");

class dashboardController {
  static async getDashboard(req, res, next) {
    try {
      const db = getDB();

      const rooms = db.collection("rooms");
      const tenants = db.collection("tenants");

      const totalRooms = await rooms.countDocuments();
      const availableRooms = await rooms.countDocuments({ isAvailable: true });
      const occupiedRooms = totalRooms - availableRooms;

      const activeTenants = await tenants.countDocuments({ isActive: true });

      const depositAgg = await tenants
        .aggregate([
          { $match: { isActive: true, depositReturned: false } },
          {
            $group: {
              _id: null,
              totalDeposit: { sum: "$depositPaid" },
            },
          },
        ])
        .toArray();

      const totalDepositHeld = depositAgg[0]?.totalDeposit || 0;

      const revenueAgg = await tenants
        .aggregate([
          { $match: { isActive: true } },
          { $group: { _id: null, totalRevenue: { $sum: "$price" } } },
        ])
        .toArray();

      const monthlyRevenueProjection = revenueAgg[0]?.totalRevenue || 0;

      res.status(200).json({
        totalRooms,
        availableRooms,
        occupiedRooms,
        activeTenants,
        totalDepositHeld,
        monthlyRevenueProjection,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = dashboardController;
