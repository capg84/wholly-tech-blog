const router = require("express").Router();

const signUpRoutes = require("./signUpRoutes");

router.use("/sign-up", signUpRoutes);

module.exports = router;
