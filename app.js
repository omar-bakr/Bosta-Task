const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoute = require("./routes/UserRoutes");
const checkRoute = require("./routes/CheckRoutes");
const reportRoute = require("./routes/ReportRoutes");
const { verifyToken } = require("./utils/auth");

require("dotenv").config();
const config = process.env;

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/user", userRoute);
app.use("/api/check", verifyToken, checkRoute);
app.use("/api/report", verifyToken, reportRoute);

const listen = () =>
  app.listen(config.PORT, () => {
    console.log(`Server Started at ${3000}`);
  });
  
const connectDB = () => {
  mongoose.connection
    .on("error", console.log)
    .on("connected", () => console.log("DB connected sucessfully"))
    .once("open", listen);
  return mongoose.connect(config.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

connectDB();
