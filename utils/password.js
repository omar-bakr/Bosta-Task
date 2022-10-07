const bcrypt = require("bcryptjs");

exports.hashPassword = async (passwordPlain) => {
  return await bcrypt.hash(passwordPlain, 10);
};

exports.checkHash = async (passwordPlain, passwordHashed) => {
  return await bcrypt.compare(passwordPlain, passwordHashed);
};
