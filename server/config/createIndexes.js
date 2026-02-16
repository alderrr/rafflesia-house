const { getDB } = require("./db");

const createIndexes = async () => {
  try {
    const db = getDB();

    // Room Collection Indexes
    await db.collection("rooms").createIndexes([
      { key: { roomNumber: 1 }, unique: true }, // Room number unique
      { key: { isAvailable: 1, isDeleted: 1 } }, // Available rooms
      { key: { priceMonthly: 1, floor: 1, isDeleted: 1 } }, // Sorting by price and floor
      { key: { isDeleted: 1 } }, // Soft delete flag
    ]);

    // Tenant Collection Indexes
    await db.collection("tenants").createIndexes([
      { key: { isActive: 1, isDeleted: 1 } }, // Active tenants
      { key: { roomId: 1, isDeleted: 1 } }, // Tenant by Room ID
      { key: { guestId: 1, isDeleted: 1 } }, // Tenant by Guest ID
      { key: { isDeleted: 1 } }, // Soft delete flag
    ]);

    // Payments Collection Indexes
    await db.collection("payments").createIndexes([
      { key: { tenantId: 1, isDeleted: 1 } }, // Payments by Tenant
      { key: { type: 1, paidAt: 1, isDeleted: 1 } }, // Payments by Type and Date Range
      { key: { paidAt: 1, isDeleted: 1 } }, // Payments by Date Range
      { key: { isDeleted: 1 } }, // Soft delete flag
    ]);

    // Guests Collection Indexes
    await db.collection("guests").createIndexes([
      { key: { idcard: 1 }, unique: true }, // Guest unique lookup by ID card
      { key: { isDeleted: 1 } }, // Soft delete flag
    ]);

    // Admin Collection Indexes
    await db.collection("admins").createIndexes([
      { key: { username: 1 }, unique: true }, // Admin unique lookup by username
      { key: { isDeleted: 1 } }, // Soft delete flag
    ]);

    console.log("Indexes created successfully.");
  } catch (err) {
    console.error("Error creating indexes: ", err);
  }
};

module.exports = createIndexes;
