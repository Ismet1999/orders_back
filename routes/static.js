const Router = require("express");
const router = new Router();
const staticController = require("./../controllers/staticController.js");

router.use("/:path", staticController.get);

module.exports = router;
