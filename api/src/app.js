const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const accountRoute = require("./routes/account");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1/account", accountRoute);

// Errors handling
app.use((req, res, next) => {
  let err = new Error("Route not found");
  err.status = 404;
  next(err);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
