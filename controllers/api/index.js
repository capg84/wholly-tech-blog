const router = require("express").Router();

const signUpRoutes = require("./signUpRoutes");
const signinRoutes = require("./signinRoutes");
const signoutRoutes = require("./signoutRoutes");
const blogRoutes = require("./blogRoutes");

router.use("/signup", signUpRoutes);
router.use("/signin", signinRoutes);
router.use("/signout", signoutRoutes);
router.use("/blogs", blogRoutes);

module.exports = router;
