const { getDB } = require("../config/db");

class reportController {
  static async financialSummary(req, res, next) {
    try {
      const { start, end } = req.query;

      const db = getDB();
      const payments = db.collection("payments");
      const tenants = db.collection("tenants");

      const filter = { isDeleted: { $ne: true } };
      if (start || end) {
        filter.paidAt = {};
        if (start) filter.paidAt.$gte = new Date(start);
        if (end) filter.paidAt.$lte = new Date(end);
      }

      const totals = await payments
        .aggregate([
          { $match: filter },
          {
            $group: {
              _id: "$type",
              total: { $sum: "$amount" },
              count: { $sum: 1 },
            },
          },
        ])
        .toArray();

      const rentTotal = totals.find((t) => t._id === "rent")?.total || 0;
      const depositTotal = totals.find((t) => t._id === "deposit")?.total || 0;
      const depositReturnTotal =
        totals.find((t) => t._id === "deposit_return")?.total || 0;
      const damageDeductionTotal =
        totals.find((t) => t._id === "damage_deduction")?.total || 0;

      const today = new Date();
      const overdueTenants = await tenants.countDocuments({
        isActive: true,
        isDeleted: { $ne: true },
        nextPaymentDate: { $lt: today },
      });

      res.status(200).json({
        period: {
          start: start ? new Date(start) : null,
          end: end ? new Date(end) : null,
        },
        totalsByType: totals,
        summary: {
          rentTotal,
          depositTotal,
          depositReturnTotal,
          damageDeductionTotal,
          netcashIn:
            rentTotal +
            depositTotal -
            depositReturnTotal -
            damageDeductionTotal,
          overdueTenants,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = reportController;
