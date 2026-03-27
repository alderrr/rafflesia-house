const { Room } = require("../models");
const AppError = require("../utils/AppError");

class RoomController {
  static async createRoom(req, res, next) {
    try {
      const {
        name,
        priceDaily,
        priceMonthly,
        hasAC,
        photos = [],
        notes = "",
        isAvailable = true,
      } = req.body;

      if (!name || !priceDaily || !priceMonthly) {
        throw new AppError(
          "Name, daily price, and monthly price are required",
          400,
        );
      }

      const room = await Room.create({
        name,
        priceDaily,
        priceMonthly,
        hasAC: !!hasAC,
        photos,
        notes,
        isAvailable: !!isAvailable,
        isActive: true,
      });

      return res.status(201).json({
        status: "success",
        data: room,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPublicRooms(req, res, next) {
    try {
      const rooms = await Room.findAll({
        where: {
          isActive: true,
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

  static async getRoomById(req, res, next) {
    try {
      const room = await Room.findByPk(req.params.id);

      if (!room) {
        throw new AppError("Room not found", 404);
      }

      return res.json({
        status: "success",
        data: room,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateRoom(req, res, next) {
    try {
      const room = await Room.findByPk(req.params.id);

      if (!room) {
        throw new AppError("Room not found", 404);
      }

      const {
        name,
        priceDaily,
        priceMonthly,
        hasAC,
        photos,
        notes,
        isAvailable,
        isActive,
      } = req.body;

      await room.update({
        name: name ?? room.name,
        priceDaily: priceDaily ?? room.priceDaily,
        priceMonthly: priceMonthly ?? room.priceMonthly,
        hasAC: hasAC ?? room.hasAC,
        photos: photos ?? room.photos,
        notes: notes ?? room.notes,
        isAvailable: isAvailable ?? room.isAvailable,
        isActive: isActive ?? room.isActive,
      });

      return res.json({
        status: "success",
        data: room,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deactivateRoom(req, res, next) {
    try {
      const room = await Room.findByPk(req.params.id);

      if (!room) {
        throw new AppError("Room not found", 404);
      }

      await room.update({
        isActive: false,
      });

      return res.json({
        status: "success",
        message: "Room deactivated",
        data: room,
      });
    } catch (error) {
      next(error);
    }
  }

  static async toggleAvailability(req, res, next) {
    try {
      const room = await Room.findByPk(req.params.id);

      if (!room) {
        throw new AppError("Room not found", 404);
      }

      await room.update({
        isAvailable: !room.isAvailable,
      });

      return res.json({
        status: "success",
        data: room,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RoomController;
