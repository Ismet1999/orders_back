const Router = require("express");
const router = new Router();
const statusesController = require("./../controllers/statusesController.js");

router.get("/", statusesController.getAll);
router.post("/", statusesController.create);
router.get("/:id", statusesController.getOne);
router.put("/:id", statusesController.edit);
router.delete("/:id", statusesController.delete);

module.exports = router;
