const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/add")
  .post(userController.add);

router.route("/:email")
  .get(userController.getByEmail);

router.route("/handle/:handle")
  .get(userController.getByHandle);


module.exports = router;