const { z } = require("zod");

const createUserSchema = z.object({
  username: z.string().min(4, "Username must be at least 4 characters").max(20),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "staff"]),
});

const updateUserSchema = z.object({
  role: z.enum(["admin", "staff"]),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};
