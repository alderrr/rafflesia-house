const { hashSync, genSaltSync, compareSync } = require("bcryptjs");

const hashPassword = (password) => {
  let salt = genSaltSync(10);
  let hashedPassword = hashSync(password, salt);
  return hashedPassword;
};

const comparePassword = (password, hashedPassword) => {
  return compareSync(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
