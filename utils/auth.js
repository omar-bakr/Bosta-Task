const jwt = require("jsonwebtoken");
require("dotenv").config("../.env");

const config = process.env;

exports.generateToken = (userData) =>
  jwt.sign(JSON.stringify(userData), config.SECRET_KEY);

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).send("Please login first");
  }
  try {
    const decoded = jwt.verify(token, config.SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};
