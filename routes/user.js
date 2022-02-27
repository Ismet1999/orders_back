const Router = require("express");
const router = new Router();
const userController = require("./../controllers/userController.js");

router.get("/", userController.getAll);
router.post("/", userController.create);
router.get("/:id", userController.getOne);
router.put("/:id", userController.edit);
router.delete("/:id", userController.delete);

module.exports = router;
