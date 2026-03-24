const { User, RefreshToken } = require("../models");
const { comparePassword } = require("../utils/password");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
const AppError = require("../utils/AppError");

class AuthController {
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({
        where: { username, isActive: true },
      });

      if (!user) throw new AppError("Invalid username or password", 401);

      const validPassword = await comparePassword(password, user.password);
      if (!validPassword)
        throw new AppError("Invalid username or password", 401);

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      await RefreshToken.create({
        token: refreshToken,
        userId: user.id,
      });

      return res.json({
        status: "success",
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) throw new AppError("Refresh token required", 401);

      const stored = await RefreshToken.findOne({
        where: { token: refreshToken },
      });

      if (!stored) throw new AppError("Invalid refresh token", 403);

      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      const user = await User.findByPk(decoded.id);

      if (!user || !user.isActive) throw new AppError("User not valid", 403);

      const newAccessToken = generateAccessToken(user);

      return res.json({
        status: "success",
        data: {
          accessToken: newAccessToken,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async logout(req, res, next) {
    try {
      const { refreshToken } = req.body;

      await RefreshToken.destroy({
        where: { token: refreshToken },
      });

      return res.json({
        status: "success",
        message: "Logged out",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
