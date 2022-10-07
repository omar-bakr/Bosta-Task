const ReportModel = require("../models/Report");

exports.createReport = async (report) => {
  return await ReportModel.create(report);
};

exports.getReportsByCheckIds = async (checkIds) => {
  return await ReportModel.find({ checkId: { $in: checkIds } });
};

exports.changeStatus = async (id, status) => {
  return await ReportModel.findByIdAndUpdate(id, status);
};
