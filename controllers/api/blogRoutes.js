const { User, Blog } = require("../../models");
const router = require("express").Router();
const auth = require("../../utils/auth");

// dashboard
router.get("/dashboard", auth, async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },

      attributes: ["id", "title", "blog", "date_created", "user_id"],
      include: [{ model: User, attributes: ["username"] }],
    });

    const blogsSerialized = blogs.map((blog) => blog.get({ plain: true }));
    const newObj = { blogs: blogsSerialized, logged_in: req.session.logged_in };

    res.render("dashboard", newObj);
  } catch (err) {
    res.status(500).json(err);
  }
});

// post new blog
router.post("/new-blog", auth, async (req, res) => {
  try {
    const blog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
      username: req.session.username,
    });

    res.json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit an existing blog
router.get("/edit-blog/:id", auth, async (req, res) => {
  try {
    const blogs = await Blog.findByPk(req.params.id, {
      attributes: ["id", "title", "blog", "date_created", "user_id"],
      include: [{ model: User, attributes: ["username"] }],
    });

    const blog = blogs.get({ plain: true });
    const newObj = { blogs: blog, logged_in: req.session.logged_in };

    res.render("edit-blog", newObj);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update an existing blog
router.put("/update-blog/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.update(
      {
        title: req.body.title,
        blog: req.body.blog,
        user_id: req.session.user_id,
      },
      { where: { id: req.params.id } }
    );

    res.json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete an existing blog
router.delete("/delete-blog/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!blog) {
      res.status(404).json({ message: "404 No blog found" });
      return;
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// add comment to a blog
router.get("/new-form/:id", auth, async (req, res) => {
  try {
    const comment = await Blog.findByPk(req.params.id, {
      attributes: ["id", "user_id"],
      include: [{ model: User, attributes: ["username"] }],
    });

    const newCom = comment.get({ plain: true });
    const newObj = { blogs: newCom, logged_in: req.session.logged_in };
    res.render("new-comment", newObj);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
