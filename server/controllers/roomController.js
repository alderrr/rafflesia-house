const { Room } = require("../models");
const AppError = require("../utils/AppError");

class RoomController {
  static async createRoom(req, res, next) {
    try {
      const { name, priceDaily, priceMonthly, hasAC, photos } = req.body;

      const room = await Room.create({
        name,
        priceDaily,
        priceMonthly,
        hasAC,
        photos,
      });

      return res.status(201).json({
        status: "success",
        data: room,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getPublicRooms(req, res, next) {
    try {
      const rooms = await Room.findAll({
        where: {
          isAvailable: true,
        },
        order: [["createdAt", "DESC"]],
      });

      return res.json({
        status: "success",
        data: rooms,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAdminRooms(req, res, next) {
    try {
      const rooms = await Room.findAll({
        order: [["createdAt", "DESC"]],
      });

      return res.json({
        status: "success",
        data: rooms,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateRoom(req, res, next) {
    try {
      const { id } = req.params;

      const room = await Room.findByPk(id);

      if (!room) throw new AppError("Room not found", 404);

      await room.update(req.body);

      return res.json({
        status: "success",
        data: room,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteRoom(req, res, next) {
    try {
      const { id } = req.params;

      const room = await Room.findByPk(id);

      if (!room) throw new AppError("Room not found", 404);

      await room.destroy();

      return res.json({
        status: "success",
        message: "Room deleted",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = RoomController;
