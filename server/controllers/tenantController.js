const { getDB, getClient } = require("../config/db");
const { ObjectId } = require("mongodb");

class tenantController {
  static async createTenant(req, res, next) {
    const client = getClient();
    const session = client.startSession();

    try {
      await session.withTransaction(async () => {
        const { guestId, roomId, paymentType, checkInDate } = req.body || {};

        if (!ObjectId.isValid(guestId)) throw new Error("Guest not found");
        if (!ObjectId.isValid(roomId)) throw new Error("Room not found");
        if (!["daily", "monthly"].includes(paymentType))
          throw new Error("Invalid payment type");

        const db = getDB();
        const guests = db.collection("guests");
        const rooms = db.collection("rooms");
        const tenants = db.collection("tenants");

        const guest = await guests.findOne(
          { _id: new ObjectId(guestId) },
          { session },
        );
        if (!guest) throw new Error("Guest not found");

        const room = await rooms.findOne(
          { _id: new ObjectId(roomId) },
          { session },
        );
        if (!room) throw new Error("Room not found");
        if (!room.isAvailable) throw new Error("Room is not available");

        const checkIn = new Date(checkInDate || new Date());

        const nextPaymentDate =
          paymentType === "daily"
            ? new Date(checkIn.getTime() + 24 * 60 * 60 * 1000)
            : new Date(new Date(checkIn).setMonth(checkIn.getMonth() + 1));

        const price =
          paymentType === "daily" ? room.priceDaily : room.priceMonthly;

        const deposit = room.depositAmount || 0;

        await tenants.insertOne(
          {
            guestId: new ObjectId(guestId),
            roomId: new ObjectId(roomId),
            paymentType,
            price,
            depositPaid: deposit,
            depositReturned: false,
            checkInDate: checkIn,
            checkOutDate: null,
            nextPaymentDate,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          { session },
        );

        await rooms.updateOne(
          { _id: new ObjectId(roomId) },
          {
            $set: {
              isAvailable: false,
              updatedAt: new Date(),
            },
          },
          { session },
        );
      });

      res.status(201).json({
        message: "Tenant created successfully",
      });
    } catch (err) {
      next(err);
    } finally {
      await session.endSession();
    }
  }
  static async checkoutTenant(req, res, next) {
    const client = getClient();
    const session = client.startSession();

    try {
      await session.withTransaction(async () => {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) throw new Error("Tenant not found");

        const db = getDB();
        const tenants = db.collection("tenants");
        const rooms = db.collection("rooms");

        const tenant = await tenants.findOne(
          { _id: new ObjectId(id) },
          { session },
        );

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
          { session },
        );

        await rooms.updateOne(
          { _id: tenant.roomId },
          {
            $set: {
              isAvailable: true,
              updatedAt: new Date(),
            },
          },
          { session },
        );
      });

      res.status(200).json({
        message: "Tenant checked out successfully",
      });
    } catch (err) {
      next(err);
    } finally {
      await session.endSession();
    }
  }
  static async getTenants(req, res, next) {
    try {
      const db = getDB();
      const tenants = db.collection("tenants");

      const foundTenants = await tenants
        .find({ isDeleted: { $ne: true } })
        .toArray();

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
        isDeleted: { $ne: true },
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
        isDeleted: { $ne: true },
      });

      if (!tenant) throw new Error("Tenant not found");

      if (tenant.isActive) throw new Error("Cannot delete active tenant");

      const existingPayment = await payments.findOne({
        tenantId: new ObjectId(id),
      });

      if (existingPayment) throw new Error("Tenant has payment history");

      await tenants.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            isDeleted: true,
            deletedAt: new Date(),
            updatedAt: new Date(),
          },
        },
      );

      res.status(200).json({
        message: "Tenant deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = tenantController;
