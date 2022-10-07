const CheckModel = require("../models/Check");

exports.createCheck = async (check) => {
  return await CheckModel.create(check);
};

exports.getAllChecks = async (data) => {
  return await CheckModel.find(data);
};

exports.getCheckById = async (id) => {
  return await CheckModel.findById(id);
};

exports.updateCheck = async (id, check) => {
  return await CheckModel.findByIdAndUpdate(id, check);
};

exports.deleteCheck = async (id) => {
  return await CheckModel.findByIdAndDelete(id);
};
