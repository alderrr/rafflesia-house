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

class tenantController {
  static async createTenant(req, res, next) {
    try {
      const { guestId, roomId, paymentType, checkInDate } = req.body || {};

      if (!ObjectId.isValid(guestId)) throw new Error("Guest not found");
      if (!ObjectId.isValid(roomId)) throw new Error("Room not found");
      if (!["daily", "monthly"].includes(paymentType))
        throw new Error("Invalid payment type");

      const db = getDB();
      const guests = db.collection("guests");
      const rooms = db.collection("rooms");
      const tenants = db.collection("tenants");

      const guest = await guests.findOne({ _id: new ObjectId(guestId) });
      if (!guest) throw new Error("Guest not found");

      const room = await rooms.findOne({ _id: new ObjectId(roomId) });
      if (!room) throw new Error("Room not found");

      if (!room.isAvailable) throw new Error("Room is not available");

      const checkIn = new Date(checkInDate || new Date());

      const nextPaymentDate =
        paymentType === "daily" ? addDays(checkIn, 1) : addMonths(checkIn, 1);

      const price = paymentType === "daily" ? room.priceDaily : room.Monthly;

      const deposit = room.depositAmount || 0;

      const newTenant = await tenants.insertOne({
        guestId: new ObjectId(guestId),
        roomId: new ObjectId(roomId),
        paymentType,
        price,
        depositPaid: deposit,
        depositReturned: false,
        checkInDate: new Date(checkInDate || new Date()),
        checkOutDate: null,
        nextPaymentDate,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await rooms.updateOne(
        { _id: new ObjectId(roomId) },
        { $set: { isAvailable: false, updatedAt: new Date() } },
      );

      res.status(201).json({
        id: newTenant.insertedId,
        message: "Tenant created successfully",
      });
    } catch (err) {
      next(err);
    }
  }
  static async checkoutTenant(req, res, next) {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) throw new Error("Tenant not found");

      const db = getDB();
      const tenants = db.collection("tenants");
      const rooms = db.collection("rooms");

      const tenant = await tenants.findOne({
        _id: new ObjectId(id),
      });

      if (!tenant) throw new Error("Tenant not found");
      if (!tenant.isActive) throw new Error("Tenant already checked out");

      await tenants.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            isActive: false,
            checkOutDate: new Date(),
            depositReturned: true,
            updatedAt: new Date(),
          },
        },
      );

      await rooms.updateOne(
        { _id: tenant.roomId },
        { $set: { isAvailable: true, updatedAt: new Date() } },
      );

      res.status(200).json({
        message: "Tenant checked out successfully",
      });
    } catch (err) {
      next(err);
    }
  }
  static async getTenants(req, res, next) {
    try {
      const db = getDB();
      const tenants = db.collection("tenants");

      const foundTenants = await tenants.find({}).toArray();

      res.status(200).json(foundTenants);
    } catch (err) {
      next(err);
    }
  }
  static async getTenant(req, res, next) {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) throw new Error("Tenant not found");

      const db = getDB();
      const tenants = db.collection("tenants");

      const foundTenant = await tenants.findOne({
        _id: new ObjectId(id),
      });

      if (!foundTenant) throw new Error("Tenant not found");

      res.status(200).json(foundTenant);
    } catch (err) {
      next(err);
    }
  }
  static async deleteTenant(req, res, next) {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) throw new Error("Tenant not found");

      const db = getDB();
      const tenants = db.collection("tenants");
      const payments = db.collection("payments");

      const tenant = await tenants.findOne({
        _id: new ObjectId(id),
      });

      if (!tenant) throw new Error("Tenant not found");

      if (tenant.isActive) throw new Error("Cannot delete active tenant");

      const existingPayment = await payments.findOne({
        tenantId: new ObjectId(id),
      });

      if (existingPayment) throw new Error("Tenant has payment history");

      await tenants.deleteOne({
        _id: new ObjectId(id),
      });

      res.status(200).json({
        message: "Tenant deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = tenantController;
