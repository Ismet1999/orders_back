const Router = require("express");
const router = new Router();
const authController = require("./../controllers/authController.js");

const { refreshToken } = require("./../middlewares/authMiddleware.js");

router.post("/login", authController.login);
router.post("/refresh", refreshToken, authController.refresh);

module.exports = router;
