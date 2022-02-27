const Router = require("express");
const router = new Router();
const authController = require("./../controllers/authController.js");

const authenticateToken = require("./../middlewares/authMiddleware.js");

router.post("/login", authController.login);
router.post("/refresh", authenticateToken, authController.refresh);

module.exports = router;
