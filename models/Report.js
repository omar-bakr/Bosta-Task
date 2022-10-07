const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["UP", "DOWN"],
    default: "DOWN",
    required: true,
  },
  availability: {
    type: Number,
  },
  outages: {
    type: Number,
  },
  downtime: {
    type: Number,
  },
  uptime: {
    type: Number,
  },
  responseTime: {
    type: Number,
  },
  history: [
    {
      timestampe: Date,
      log: String,
    },
  ],
  checkId: {
    type: String,
    unique: true,
    require: true,
  },
});

module.exports = mongoose.model("Report", ReportSchema);
