const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

class roomController {
  static async createRoom(req, res, next) {
    try {
      const {
        roomNumber,
        title,
        description,
        priceDaily,
        priceMonthly,
        depositAmount,
        facilities,
        size,
        floor,
      } = req.body || {};

      if (!roomNumber) throw new Error("Room number is required");
      if (!priceDaily && !priceMonthly)
        throw new Error("At least one price is required");

      const db = getDB();
      const rooms = db.collection("rooms");

      const existingRoom = await rooms.findOne({ roomNumber });
      if (existingRoom) throw new Error("Room already exists");

      const newRoom = await rooms.insertOne({
        roomNumber,
        title,
        description,
        priceDaily: Number(priceDaily) || null,
        priceMonthly: Number(priceMonthly) || null,
        depositAmount: Number(depositAmount) || 0,
        facilities: facilities || [],
        size: Number(size) || null,
        floor: Number(floor) || null,
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.status(201).json({
        id: newRoom.insertedId,
        roomNumber,
      });
    } catch (err) {
      next(err);
    }
  }
  static async getRooms(req, res, next) {
    try {
      const db = getDB();
      const rooms = db.collection("rooms");

      const foundRooms = await rooms.find({}).toArray();

      res.status(200).json(foundRooms);
    } catch (err) {
      next(err);
    }
  }
  static async getRoom(req, res, next) {
    try {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) throw new Error("Room not found");

      const db = getDB();
      const rooms = db.collection("rooms");

      const foundRoom = await rooms.findOne({
        _id: new ObjectId(id),
      });

      if (!foundRoom) throw new Error("Room not found");

      res.status(200).json(foundRoom);
    } catch (err) {
      next(err);
    }
  }
  static async updateRoom(req, res, next) {
    try {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) throw new Error("Room not found");

      const db = getDB();
      const rooms = db.collection("rooms");

      const updatedRoom = await rooms.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...req.body, updatedAt: new Date() } },
        { returnDocument: "after" },
      );

      if (!updatedRoom.value) throw new Error("Room not found");

      res.status(200).json(updatedRoom.value);
    } catch (err) {
      next(err);
    }
  }
  static async deleteRoom(req, res, next) {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) throw new Error("Room not found");

      const db = getDB();
      const rooms = db.collection("rooms");
      const tenants = db.collection("tenants");

      const room = await rooms.findOne({ _id: new ObjectId(id) });

      if (!room) throw new Error("Room not found");

      const activeTenant = await tenants.findOne({
        roomId: new ObjectId(id),
        isActive: true,
      });

      if (activeTenant) throw new Error("Room has active tenant");

      await rooms.deleteOne({ _id: new ObjectId(id) });

      res.status(200).json({ message: "Room deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
  static async getPublicRooms(req, res, next) {
    try {
      const { available, minPrice, maxPrice } = req.query;

      const db = getDB();
      const rooms = db.collection("rooms");

      let filter = {};

      if (available === "true") {
        filter.isAvailable = true;
      }

      if (minPrice || maxPrice) {
        filter.priceMonthly = {};
        if (minPrice) filter.priceMonthly.$gte = Number(minPrice);
        if (maxPrice) filter.priceMonthly.$lte = Number(maxPrice);
      }

      const foundRooms = await rooms.find(filter).toArray();

      res.status(200).json(foundRooms);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = roomController;
