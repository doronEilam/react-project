const express = require("express");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

const csrfProtection = csrf({
  cookie: {
    key: "XSRF-TOKEN",
    path: "/",
    httpOnly: false,
  },
});
const handleCSRF = (err, req, res, next) => {
  if (err.code !== "EBADCSRFTOKEN") return next(err);
  res.status(403).json({ message: "Invalid CSRF token" });
};

const errorHandler = (err, req, res, next) => {
  res.status(500).json({ message: "An error occurred" });
};

module.exports = {
  csrfProtection,
  handleCSRF,
  errorHandler,
};
