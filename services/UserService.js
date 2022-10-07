const UserModel = require("../models/User");
const { hashPassword } = require("../utils/password");
const { generateToken } = require("../utils/auth");

exports.createUser = async ({ email, password, firstName, lastName }) => {
  const passwordHashed = await hashPassword(password);
  const token = generateToken({ email });
  return await UserModel.create({
    email,
    password: passwordHashed,
    firstName,
    lastName,
    confirmationCode: token,
  });
};

exports.getUser = async (data) => {
  return await UserModel.findOne(data);
};

exports.getUserById = async (id) => {
  return await UserModel.findById(id);
};

exports.updateUser = async (id, user) => {
  return await UserModel.findByIdAndUpdate(id, user);
};

exports.deleteUser = async (id) => {
  return await UserModel.findByIdAndDelete(id);
};
