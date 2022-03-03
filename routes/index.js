const Router = require("express");
const router = new Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const ordersRouter = require("./orders");
const statusesRouter = require("./statuses");

const { authenticateToken } = require("./../middlewares/authMiddleware.js");

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/orders", authenticateToken, ordersRouter);
router.use("/statuses", authenticateToken, statusesRouter);

module.exports = router;
