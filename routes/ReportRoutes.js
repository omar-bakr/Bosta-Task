const express = require("express");
const reportController = require("../controllers/ReportController");
const router = express.Router();
const { body } = require("express-validator");

router.put(
  "/changeStatus/:id",
  body("protocol").isIn(["UP", "DOWN"]),
  reportController.changeStatus
);

router.get("/list/", reportController.getAllReports);
router.get("/listByTag/:tag", reportController.getAllReportsByTag);

module.exports = router;
