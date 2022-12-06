const router = require("express").Router();
const { Blog, User } = require("../models");

// Rendering sign-up page
router.get("/sign-up", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Rendering sign-up sign-in prompt
router.get("/signin-signup", async (req, res) => {
  try {
    res.render("signprompt");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Rendering sign-in page
router.get("/sign-in", async (req, res) => {
  try {
    res.render("signin");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
