const { body } = require("express-validator");

exports.employeeValidators = [
  body("fullName")
    .isString()
    .withMessage("FullName length must be string")
    .isLength({ min: 6 })
    .withMessage("FullName length must be at least 6 characters")
    .matches(/^[a-zA-Zа-яА-ЯёЁ\s]+$/)
    .withMessage("FullName must be alphabetic."),

  body("birthday")
    .isString()
    .withMessage("Date of birth length must be string")
    .trim(),

  body("position")
    .isString()
    .withMessage("Position must be string")
    .matches(/^[a-zA-Zа-яА-ЯёЁ\s]+$/)
    .withMessage("Position must be alphabetic."),

  body("salary").isNumeric().withMessage("Salary must be numeric"),
];
