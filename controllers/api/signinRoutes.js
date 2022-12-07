const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userData) {
      res.status(400).json({
        message: "Email or password does not match, please try again",
      });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message: "Email or password does not match, please try again",
      });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      console.log(req.session.username, req.session.user_id);
      res.json({
        user: userData,
        message: "You are now successfully logged in!",
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
