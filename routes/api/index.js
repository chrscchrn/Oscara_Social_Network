const router = require("express").Router();
const userRoutes = require("./users");
const postRoutes = require("./posts");
const imageRoutes = require("./images");

router.use("/user", userRoutes);
router.use("/posts", postRoutes);
router.use("/images", imageRoutes);

module.exports = router;