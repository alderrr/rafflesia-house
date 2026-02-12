const { MongoClient } = require("mongodb");

let client;
let db;

const connectDB = async () => {
  if (db) return db;

  client = new MongoClient(process.env.MONGODB_URI, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });

  await client.connect();
  db = client.db(process.env.MONGODB_DBNAME);

  console.log("MongoDB connected");
  return db;
};

const getDB = () => {
  if (!db) throw new Error("Database not initialized");
  return db;
};

const getClient = () => {
  if (!client) throw new Error("Client not initialized");
  return client;
};

module.exports = {
  connectDB,
  getDB,
  getClient,
};
