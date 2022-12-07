const router = require("express").Router();

const signUpRoutes = require("./signUpRoutes");
const signinRoutes = require("./signinRoutes");

router.use("/signup", signUpRoutes);
router.use("/signin", signinRoutes);

module.exports = router;
