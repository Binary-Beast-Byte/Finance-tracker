const express = require("express");
const passport = require("passport");

const loginSuccess = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Logged in",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not authorized" });
  }
};

const loginFailed = async (req, res) => {
  res.status(401).json({
    error: true,
    message: "Logged in Faliure",
  });
};

const googleCallback = async (req, res) => {
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  });
};

const logout = async (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
};

module.exports = {
  googleCallback,
  loginFailed,
  loginSuccess,
  logout,
};
