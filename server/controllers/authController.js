const { getDB } = require("../config/db");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt");
const { ObjectId } = require("mongodb");

class authController {
  static async registerAdmin(req, res, next) {
    try {
      const { username, password, role } = req.body || {};

      if (!username || !password)
        throw new Error("Username and password are required");
      if (!["owner", "staff"].includes(role)) throw new Error("Invalid role");

      const db = getDB();
      const admins = db.collection("admins");

      const existingAdmin = await admins.findOne({ username });
      if (existingAdmin) {
        throw new Error("Username already exists");
      }

      const hashedPassword = hashPassword(password);
      const newAdmin = await admins.insertOne({
        username,
        password: hashedPassword,
        role,
        createdAt: new Date(),
      });

      res.status(201).json({
        id: newAdmin.insertedId,
        username,
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
        role: foundAdmin.role,
      });

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
  static async getAdmins(req, res, next) {
    try {
      const db = getDB();
      const admins = db.collection("admins");

      const foundAdmins = await admins
        .find({}, { projection: { password: 0 } })
        .toArray();
      res.status(200).json(foundAdmins);
    } catch (err) {
      next(err);
    }
  }
  static async getAdmin(req, res, next) {
    try {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        throw new Error("Admin not found");
      }

      const db = getDB();
      const admins = db.collection("admins");

      const foundAdmin = await admins.findOne(
        {
          _id: new ObjectId(id),
        },
        { projection: { password: 0 } },
      );

      if (!foundAdmin) {
        throw new Error("Admin not found");
      }

      res.status(200).json(foundAdmin);
    } catch (err) {
      next(err);
    }
  }
  static async deleteAdmin(req, res, next) {
    try {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        throw new Error("Admin not found");
      }

      const db = getDB();
      const admins = db.collection("admins");

      const deletedAdmin = await admins.deleteOne({
        _id: new ObjectId(id),
      });

      if (deletedAdmin.deletedCount === 0) {
        throw new Error("Admin not found");
      }

      res.status(200).json({
        message: "Admin deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = authController;
