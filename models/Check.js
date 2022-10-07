const mongoose = require("mongoose");

const CheckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  protocol: {
    type: String,
    enum: ["HTTP", "HTTPS", "TCP"],
    default: "HTTP",
    required: true,
  },
  path: {
    type: String,
  },
  port: {
    type: Number,
  },
  webhook: {
    type: String,
  },
  timeout: {
    type: Number,
    default: 5,
  },
  interval: {
    type: Number,
    default: 10 * 60,
  },
  threshold: {
    type: Number,
    default: 1,
  },
  authentication: {
    username: String,
    password: String,
  },
  httpHeaders: [
    {
      key: String,
      value: String,
    },
  ],
  assert: {
    statusCode: Number,
  },
  tags: [String],
  ignoreSSL: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String,
    reqire: true,
  },
});

module.exports = mongoose.model("Check", CheckSchema);
