const { getDB } = require("../config/db");
const { ObjectId, ReturnDocument } = require("mongodb");

class guestController {
  static async createGuest(req, res, next) {
    try {
      const { idcard, name } = req.body || {};

      if (!idcard) {
        throw new Error("ID Card Number is required");
      }

      const db = getDB();
      const guests = db.collection("guests");

      const existingGuest = await guests.findOne({ idcard });
      if (existingGuest) {
        throw new Error("Guest already exists");
      }

      const newGuest = await guests.insertOne({
        idcard: idcard,
        name: name,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.status(201).json({
        id: newGuest.insertedId,
        idcard: newGuest.idcard,
        name: newGuest.name,
      });
    } catch (err) {
      next(err);
    }
  }
  static async getGuests(req, res, next) {
    try {
      const db = getDB();
      const guests = db.collection("guests");

      const foundGuests = await guests.find({}).toArray();

      res.status(200).json(foundGuests);
    } catch (err) {
      next(err);
    }
  }
  static async getGuest(req, res, next) {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        throw new Error("Guest not found");
      }

      const db = getDB();
      const guests = db.collection("guests");

      const foundGuest = await guests.findOne({
        _id: new ObjectId(id),
      });

      if (!foundGuest) {
        throw new Error("Guest not found");
      }

      res.status(200).json(foundGuest);
    } catch (err) {
      next(err);
    }
  }
  static async updateGuest(req, res, next) {
    try {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        throw new Error("Guest not found");
      }

      const db = getDB();
      const guests = db.collection("guests");

      const updatedGuest = await guests.findOneAndUpdate(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            ...(name && { name }),
            ...(idcard && { idcard }),
            updatedAt: new Date(),
          },
        },
        { returnDocument: "after" },
      );

      if (!updatedGuest.value) throw new Error("Guest not found");

      res.status(200).json(updatedGuest.value);
    } catch (err) {
      next(err);
    }
  }
  static async deleteGuest(req, res, next) {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        throw new Error("Guest not found");
      }

      const db = getDB();
      const guests = db.collection("guests");
      const tenants = db.collection("tenants");

      const guest = await guests.findOne({ _id: new ObjectId(id) });

      if (!guest) throw new Error("Guest not found");

      const activeTenant = await tenants.findOne({
        guestId: new ObjectId(id),
        isActive: true,
      });

      if (activeTenant) throw new Error("Guest has active tenant");

      await guests.deleteOne({ _id: new ObjectId(id) });

      res.status(200).json({ message: "Guest deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = guestController;
