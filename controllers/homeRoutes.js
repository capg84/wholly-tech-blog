const router = require("express").Router();
const { Blog, User } = require("../models");

// Rendering sign-up page
router.get("/signup", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Rendering sign-up sign-in prompt
router.get("/signinSignup", async (req, res) => {
  try {
    res.render("loginprompt");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Rendering sign-in page
router.get("/signin", async (req, res) => {
  try {
    res.render("signin");
  } catch (err) {
    res.status(500).json(err);
  }
});

// rendering all blogs to home page
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      attributes: ["id", "title", "blog", "date_created", "user_id"],
      include: [{ model: User, attributes: ["username"] }],
    });

    const blogsSerialized = blogs.map((blog) => blog.get({ plain: true }));
    const obj = { blogs: blogsSerialized, logged_in: req.session.logged_in };

    res.render("saved-blogs", obj);
  } catch (err) {
    res.status(500).json(err);
  }
});

// rendering the new blog page
router.get("/new-blog", async (req, res) => {
  try {
    res.render("new-blog");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
