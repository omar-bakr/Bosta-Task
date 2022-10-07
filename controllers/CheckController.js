const checkService = require("../services/CheckService");
const { createReport } = require("../services/ReportService");
const { validationResult } = require("express-validator");

exports.create = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
  } else {
    const check = req.body;
    const userId = req.user.id;
    const checkInput = { ...check, userId };
    try {
      const check = await checkService.createCheck(checkInput);
      const history = [{ timestampe: new Date(), log: "Report created" }];
      await createReport({ checkId: check._id, history });
      res.status(200).json({ data: check, message: "Check created successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

exports.getAll = async (req, res) => {
  const userId = req.user.id;

  try {
    const checks = await checkService.getAllChecks({ userId });
    res.status(200).json({ data: checks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByTag = async (req, res) => {
  const tags = req.params.tag;
  const userId = req.user.id;

  try {
    const checks = await checkService.getAllChecks({ tags, userId });
    res.status(200).json({ data: checks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.get = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  try {
    const check = await checkService.getCheckById(id);
    if (check.userId !== userId) {
      res.status(401).json({
        message: "You must be the one who created the check to get it",
      });
    } else {
      res.status(200).json({ data: check });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const checkInput = req.body;
  const userId = req.user.id;

  try {
    const check = await checkService.getCheckById(id);
    if (check.userId !== userId) {
      res.status(401).json({
        message: "You must be the one who created the check to update it",
      });
    } else {
      await checkService.updateCheck(id, checkInput);
      res.status(200).json({ message: "Check updated sucessfully" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;

  try {
    const check = await checkService.getCheckById(id);
    if (check.userId !== userId) {
      res.status(401).json({
        message: "You must be the one who created the check to delete it",
      });
    } else {
      await checkService.deleteCheck(id);
      res.status(200).json({ message: "Check deleted sucessfully" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
