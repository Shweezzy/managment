const { Router } = require("express");
const router = Router();
const { validationResult } = require("express-validator");
const { employeeValidators } = require("./validator");
const Employee = require("../../schemas/employee");

router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();

    res.json({
      employees,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", employeeValidators, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      msg: errors.array()[0].msg,
    });
  }

  const { fullName, birthday, position, salary } = req.body;

  const employee = new Employee({
    fullName,
    birthday,
    position,
    salary,
  });

  try {
    await employee.save();

    res.json({
      msg: "Employee is created",
      employee,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/edit", employeeValidators, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      msg: errors.array()[0].msg,
    });
  }

  try {
    const employee = await Employee.findById(req.body._id);

    delete req.body._id;

    Object.assign(employee, req.body);

    await employee.save();

    res.json({
      msg: "Changes saved",
    });
  } catch (e) {
    console.log(e);
  }
});

router.post("/delete", async (req, res) => {
  const { _id } = req.body;

  try {
    await Employee.deleteOne({ _id });

    res.json({
      msg: "Employee is deleted",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
