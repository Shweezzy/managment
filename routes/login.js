const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { loginValidation } = require("./validators");
const keys = require("../keys");

router.post("/login", loginValidation, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      msg: errors.array()[0].msg,
    });
  }

  try {
    const user = {
      user: req.body.login,
    };

    const token = jwt.sign(user, keys.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
