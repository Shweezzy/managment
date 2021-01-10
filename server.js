const express = require("express");
const mongoose = require("mongoose");
const app = express();

const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

/* Middleware */
const notFound = require("./middleware/404");
const connectToDatabase = require("./config/connectToMongo");

/* Routes */
const registrationRoutes = require("./routes/auth/registration");
const loginRoutes = require("./routes/auth/login");
const employeeRoutes = require("./routes/employee/employee");

const keys = require("./keys");
const PORT = process.env.PORT || 1000;

connectToDatabase();

// app.use(express.static(path.join(__dirname, "public")));

/* Parse incoming requests */
app.use(bodyParser.urlencoded({ extended: false })); // x-www-urlencoded
app.use(bodyParser.json()); // json

app.use(helmet());
app.use(cors());

/* Use Routes */
app.use("/api", registrationRoutes);
app.use("/api", loginRoutes);
app.use("/api/employee", employeeRoutes);

// Error middleware after all routes
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    console.log(err);
    res.status(401).send(err);
  } else {
    next(err);
  }
});

app.use(notFound);

app.listen(PORT, () => {
  console.log(`Server is on: ${PORT}`);
});
