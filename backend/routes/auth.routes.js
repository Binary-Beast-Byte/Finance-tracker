const router = require("express").Router();
const passport = require("passport");

const authController = require("../controller/auth.controller");
const { isUserAuthenticated } = require("../middlewares/AuthMiddleware");

require("dotenv").config();

router.get("/login/success", authController.loginSuccess);

router.get("/user", isUserAuthenticated, (req, res) => {
  res.json(req.user);
});

router.get("/login/failed", authController.loginFailed);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    console.log("USER: ", req.user);
    res.send("Thank you for signing in !!");
  }
);

router.get("/logout", authController.logout);

module.exports = router;
