const { getDB } = require("../config/db");
const { verifyToken } = require("../helpers/jwt");
const { ObjectId } = require("mongodb");

const authentication = async (req, res, next) => {
  try {
    let access_token = req.headers.authorization;
    if (!access_token) {
      throw new Error("Access token required");
    }

    const [type, token] = access_token.split(" ");
    if (type !== "Bearer" || !token) {
      throw new Error("Invalid access token format");
    }

    const db = getDB();
    const admins = db.collection("admins");

    const decodedToken = verifyToken(token);
    const foundAdmin = await admins.findOne({
      _id: new ObjectId(decodedToken.id),
    });

    if (!foundAdmin) {
      throw new Error("Invalid access token");
    }

    req.user = {
      id: foundAdmin._id,
      username: foundAdmin.username,
      role: foundAdmin.role,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
