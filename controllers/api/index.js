const router = require("express").Router();

const signUpRoutes = require("./signUpRoutes");
const signinRoutes = require("./signinRoutes");
const signoutRoutes = require("./signoutRoutes");
const blogRoutes = require("./blogRoutes");
const commentsRoutes = require("./commentRoutes");

router.use("/signup", signUpRoutes);
router.use("/signin", signinRoutes);
router.use("/logout", signoutRoutes);
router.use("/blogs", blogRoutes);
router.use("/comments", commentsRoutes);

module.exports = router;
