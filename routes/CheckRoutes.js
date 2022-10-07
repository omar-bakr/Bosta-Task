const express = require("express");
const checkController = require("../controllers/CheckController");
const { body } = require("express-validator");

const router = express.Router();

router.get("/:id", checkController.get);
router.get("/list/", checkController.getAll);
router.get("/listByTag/:tag", checkController.getByTag);

router.post(
  "/create",
  body("name").isLength({ min: 3, max: 10 }),
  body("url").isURL(),
  body("protocol").isIn(["HTTPS", "HTTP"]),
  checkController.create
);

//TODO:Add validation to update check fields
router.put("/update/:id", checkController.update);
router.delete("/delete/:id", checkController.delete);

module.exports = router;
