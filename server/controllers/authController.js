const { getDB } = require("../config/db");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt");

class authController {
  static async registerAdmin(req, res, next) {
    try {
      const { username, password } = req.body || {};
      if (!username || !password) {
        throw new Error("Username and password are required");
      }

      const db = getDB();
      const admins = db.collection("admins");

      const existingAdmin = await admins.findOne({ username });
      if (existingAdmin) {
        throw new Error("Username already exists");
      }

      const hashedPassword = hashPassword(password);
      const newAdmin = await admins.insertOne({
        username: username,
        password: hashedPassword,
        createdAt: new Date(),
      });

      res.status(201).json({
        id: newAdmin.insertedId,
        username: newAdmin.username,
      });
    } catch (err) {
      next(err);
    }
  }
  static async loginAdmin(req, res, next) {
    try {
      const { username, password } = req.body || {};
      if (!username || !password) {
        throw new Error("Username and password are required");
      }

      const db = getDB();
      const admins = db.collection("admins");

      const foundAdmin = await admins.findOne({ username });
      if (!foundAdmin) {
        throw new Error("Invalid username or password");
      }

      const validPassword = comparePassword(password, foundAdmin.password);
      if (!validPassword) {
        throw new Error("Invalid username or password");
      }

      const access_token = signToken({
        id: foundAdmin._id,
        username: foundAdmin.username,
      });

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = authController;
