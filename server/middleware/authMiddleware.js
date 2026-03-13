const jwt = require("jsonwebtoken");
const { User } = require("..//models");

class AuthMiddleware {
  static async authenticate(req, res, next) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({
          message: "Token required",
        });
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({
        where: {
          id: decoded.id,
          isActive: true,
        },
      });

      if (!user) {
        return res.status(401).json({
          message: "User not found or inactive",
        });
      }

      req.user = {
        id: user.id,
        role: user.role,
        username: user.username,
      };

      next();
    } catch (err) {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }
  }
}

module.exports = AuthMiddleware;
