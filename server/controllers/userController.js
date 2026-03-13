const { User } = require("../models");
const { hashPassword } = require("../utils/password");

class UserController {
  static async createUser(req, res, next) {
    try {
      const { username, password, role } = req.body;

      const existingUser = await User.findOne({
        where: { username },
      });

      if (existingUser) {
        return res.status(400).json({
          message: "Username already exists",
        });
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
      const users = await User.findAll({
        attributes: ["id", "username", "role", "isActive", "createdAt"],
      });

      return res.json(users);
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
        return res.status(404).json({
          message: "User not found",
        });
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
        return res.status(404).json({
          message: "User not found",
        });
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
