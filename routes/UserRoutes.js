const express = require("express");
const { register,verifyUser,login } = require("../controllers/UserController");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/register",
  body("email").exists().isEmail().normalizeEmail(),
  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage(
      "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  body("firstName").optional().isAlpha().isLength({ min: 3, max: 10 }),
  body("LastName").optional().isAlpha().isLength({ min: 3, max: 10 }),
  register
);

router.get("/confirm/:confirmationCode", verifyUser);

router.post(
  "/login",
  body("email").exists().isEmail().normalizeEmail(),
  body("password").notEmpty(),
  login
);

module.exports = router;
