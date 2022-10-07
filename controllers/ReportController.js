const reportService = require("../services/ReportService");
const checkService = require("../services/CheckService");
const userService = require("../services/UserService");
const { notify } = require("../utils/notifications");
const { validationResult } = require("express-validator");

exports.changeStatus = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
  } else {
    try {
      const id = req.params.id;
      const status = req.body;
      const report = await reportService.changeStatus(id, status);
      if (report) {
        const check = await checkService.getCheckById(report.checkId);
        const user = await userService.getUserById(check.userId);
        const message = `The stataus of the following URL:${check.url} has been changed to be ${report.status}`;
        notify(user, message);
        res.status(200).json({ message: "status changed successfully" });
      } else {
        res.status(404).json({ message: "This report doesnot exsist" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

exports.getAllReports = async (req, res) => {
  const userId = req.user.id;

  try {
    const checks = await checkService.getAllChecks({ userId });
    const checksId = checks.map(({ id }) => id.toString());
    const reports = await reportService.getReportsByCheckIds(checksId);

    res.status(200).json({ data: reports });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllReportsByTag = async (req, res) => {
  const userId = req.user.id;
  const tags = req.params.tag;

  try {
    const checks = await checkService.getAllChecks({ tags, userId });
    const checksId = checks.map(({ id }) => id.toString());
    const reports = await reportService.getReportsByCheckIds(checksId);
    res.status(200).json({ data: reports });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
