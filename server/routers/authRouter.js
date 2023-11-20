const express = require("express");
const dotenv = require("dotenv");
const authController = require("../controllers/authController.js");
const userController = require("../controllers/userController.js");
const passport = require("../passport-config");
const router = express.Router();
dotenv.config();

router.get("/", (req, res) => {
  try {
    console.log("~~~~~~~~Trying to redirect to GitHub~~~~~~~~");
    return res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
    );
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] }),
);

router.get(
  "/callback",
  authController.getGithubToken,
  authController.getGithubUsername,
  userController.findOrCreateUser,
  (req, res) => {
    return res.redirect("/feed?user=" + res.locals.username);
  },
);

router.get(
  "/google/callback",
  passport.authenticate("google"),
  (req, res, next) => {
    return res.redirect("http://localhost:8080/feed?user=" + req.user.username);
  },
);

router.post("/register", authController.register, async (req, res, next) => {
  res.status(200).send();
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({ username: req.user.username });
});

module.exports = router;
