const { Op } = require("sequelize");
const { User } = require("../models");
const { hashPassword } = require("../utils/password");
const AppError = require("../utils/AppError");

class UserController {
  static async createUser(req, res, next) {
    try {
      const { username, password, role } = req.body;

      const existingUser = await User.findOne({
        where: { username },
      });

      if (existingUser) {
        throw new AppError("Username already exists", 400);
      }

      const hashedPassword = await hashPassword(password);

      const user = await User.create({
        username,
        password: hashedPassword,
        role,
      });

      return res.status(201).json({
        message: "User created",
        data: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async getUsers(req, res, next) {
    try {
      let { page = 1, limit = 10, search = "" } = req.query;

      page = parseInt(page);
      limit = parseInt(limit);

      const offset = (page - 1) * limit;

      const whereCondition = {
        isActive: true,
        ...(search && {
          username: {
            [Op.iLike]: `%${search}%`,
          },
        }),
      };

      const { rows, count } = await User.findAndCountAll({
        where: whereCondition,
        attributes: ["id", "username", "role", "isActive", "createdAt"],
        limit,
        offset,
        order: [["createdAt", "DESC"]],
      });

      return res.json({
        status: "success",
        data: rows,
        meta: {
          total: count,
          page,
          limit,
          totalPages: Math.ceil(count / limit),
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateUsers(req, res, next) {
    try {
      const { id } = req.params;
      const { role } = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        throw new AppError("User not found", 404);
      }

      await user.update({
        role,
      });

      return res.json({
        message: "User updated",
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteUsers(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      if (!user) {
        throw new AppError("User not found", 404);
      }

      await user.update({
        isActive: false,
      });

      return res.json({
        message: "User deactivated",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
