const { Comment, Blog, User } = require("../../models");
const router = require("express").Router();
const auth = require("../../utils/auth");

// create new comment for a specific blog
router.post("/create/:id", async (req, res) => {
  try {
    const comment = await Comment.create({
      comment: req.body.comment,
      blog_id: req.params.id,
      user_id: req.body.user_id,
    });
    res.json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update an exsisting comment
router.put("/update/:id", auth, async (req, res) => {
  try {
    const comment = await Comment.update(
      {
        comment: req.body.comment,
        blog_id: req.body.blog_id,
        user_id: req.body.user_id,
      },
      { where: { id: req.params.id } }
    );
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// deletes exsisting comment
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!comment) {
      res.status(404).json({ message: "Comment not found!" });
      return;
    }
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit an existing comment
router.get("/edit/:id", async (req, res) => {
  try {
    const comments = await Comment.findByPk(req.params.id, {
      attributes: ["id", "comment", "comment_create_date", "blog_id"],
      include: [
        { model: User, attributes: ["id", "username"] },
        { model: Blog, attributes: ["id"] },
      ],
    });

    const comment = comments.get({ plain: true });
    const newObj = { comments: comment, logged_in: req.session.logged_in };

    res.render("edit-comment", newObj);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// view all comments for a blog
router.get("/:id", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: {
        blog_id: req.params.id,
      },

      attributes: ["id", "comment", "comment_create_date", "blog_id"],
      include: [
        { model: User, attributes: ["id", "username"] },
        { model: Blog, attributes: ["id"] },
      ],
    });

    const commentsSerialized = comments.map((comment) =>
      comment.get({ plain: true })
    );
    const newObj = {
      comments: commentsSerialized,
      logged_in: req.session.logged_in,
    };

    res.render("comment", newObj);

    if (!comments) {
      res.status(404).json({ message: "Comment not found!" });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
