const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

const addMonths = (date, months) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
};

class paymentController {
  static async createPayment(req, res, next) {
    try {
      const { tenantId, type, amount, paidAt, note } = req.body || {};

      if (!ObjectId.isValid(tenantId)) throw new Error("Tenant not found");
      if (
        !["rent", "deposit", "deposit_return", "damage_deduction"].includes(
          type,
        )
      ) {
        throw new Error("Invalid payment type");
      }
      if (amount === undefined || amount === null || Number(amount) <= 0) {
        throw new Error("Amount must be greater than 0");
      }

      const db = getDB();
      const tenants = db.collection("tenants");
      const rooms = db.collection("rooms");
      const guests = db.collection("guests");
      const payments = db.collection("payments");

      const tenant = await tenants.findOne({ _id: new ObjectId(tenantId) });
      if (!tenant) throw new Error("Tenant not found");

      const [room, guest] = await Promise.all([
        rooms.findOne({ _id: tenant.roomId }),
        guests.findOne({ _id: tenant.guestId }),
      ]);
      if (!room) throw new Error("Room not found");
      if (!guest) throw new Error("Guest not found");

      const paymentDoc = {
        tenantId: new ObjectId(tenantId),
        guestId: tenant.guestId,
        roomId: tenant.roomId,
        type,
        amount: Number(amount),
        paidAt: paidAt ? new Date(paidAt) : new Date(),
        note: note || null,
        createdAt: new Date(),
      };

      const inserted = await payments.insertOne(paymentDoc);

      if (type === "rent" && tenant.isActive) {
        const currentNext = tenant.nextPaymentDate
          ? new Date(tenant.nextPaymentDate)
          : new Date();

        const nextPaymentDate =
          tenant.paymentType === "daily"
            ? addDays(currentNext, 1)
            : addMonths(currentNext, 1);

        await tenants.updateOne(
          { _id: tenant._id },
          { $set: { nextPaymentDate, updatedAt: new Date() } },
        );
      }

      if (ty[e === "deposit_return"]) {
        await tenants.updateOne(
          { _id: tenant._id },
          { $set: { depositReturned: true, updatedAt: new Date() } },
        );
      }

      res.status(201).json({
        id: inserted.insertedId,
        message: "Payment recorded successfully",
      });
    } catch (err) {
      next(err);
    }
  }
  static async getPayments(req, res, next) {
    try {
      const { tenantId, type, start, end } = req.query;

      const db = getDB();
      const payments = db.collection("payments");

      const filter = { isDeleted: { $ne: true } };
      if (tenantId) {
        if (!ObjectId.isValid(tenantId)) throw new Error("Tenant not found");
        filter.tenantId = new ObjectId(tenantId);
      }
      if (type) filter.type = type;
      if (start || end) {
        filter.paidAt = {};
        if (start) filter.paidAt.$gte = new Date(start);
        if (end) filter.paidAt.$lte = new Date(end);
      }

      const rows = await payments.find(filter).sort({ paidAt: -1 }).toArray();
      res.status(200).json(rows);
    } catch (err) {
      next(err);
    }
  }
  static async getTenantPayments(req, res, next) {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) throw new Error("Tenant not found");

      const db = getDB();
      const payments = db.collection("payments");

      const rows = await payments
        .find({ tenantId: new ObjectId(id), isDeleted: { $ne: true } })
        .sort({ paidAt: -1 })
        .toArray();

      res.status(200).json(rows);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = paymentController;
