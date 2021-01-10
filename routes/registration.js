const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { registrationValidation } = require("./validators");
const User = require("../schemas/user");

router.post("/registration", registrationValidation, async (req, res) => {
  try {
    const { login, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        msg: errors.array()[0].msg,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      login,
      password: hashedPassword,
    });

    await user.save();

    res.json({
      msg: "User is created",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
