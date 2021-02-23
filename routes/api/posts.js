const router = require("express").Router();
const postController = require("../../controllers/postController");

router.route("/")
    .get(postController.getAll)
    .post(postController.newPost);

router.route("/:email")
    .get(postController.userPosts);

router.route("/:id")
    .delete(postController.remove);

router.route("/:id/:handle")
    .get(postController.like);

router.route("/reply")
    .post(postController.reply);

router.route("/reply/:id")
    .get(postController.getReplies)

module.exports = router;