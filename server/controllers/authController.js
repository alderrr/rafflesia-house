const { User } = require("../models");
const { comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/jwt");

class AuthController {
  static async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({
        where: { username, isActive: true },
      });

      if (!user) {
        return res.status(401).json({
          message: "Invalid username or password",
        });
      }

      const validPassword = await comparePassword(password, user.password);

      if (!validPassword) {
        return res.status(401).json({
          message: "Invalid username or password",
        });
      }

      const token = generateToken(user);

      return res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      });
    } catch (err) {
      return res.status(500).json({
        message: err.message,
      });
    }
  }
}

module.exports = AuthController;
