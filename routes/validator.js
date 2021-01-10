const { body } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../schemas/user");

exports.registrationValidation = [
  body("login")
    .isLength({ min: 6 })
    .withMessage("Login must contain more than 6 characters.")
    .trim(),

  body("password", "The password must be more than 6 characters.")
    .isLength({ min: 6, max: 20 })
    .isAlphanumeric()
    .trim(),
];

exports.loginValidation = [
  body("password")
    .isLength({ min: 6, max: 20 })
    .withMessage("The password must be more than 6 characters.")
    .custom(async (value, { req }) => {
      try {
        const login = req.body.login;
        const user = await User.findOne({ login });

        if (user) {
          // User with same login exists
          const obviousness = await bcrypt.compare(value, user.password);

          if (obviousness) {
            return true;
          } else {
            return Promise.reject("Wrong password.");
          }
        } else {
          return Promise.reject("User with this login does not exist");
        }
      } catch (err) {
        console.log(err);
      }
    }),
];
