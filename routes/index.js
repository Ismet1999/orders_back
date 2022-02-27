const Router = require("express");
const router = new Router();
const userRouter = require("./user");
const ordersRouter = require("./orders");
const statusesRouter = require("./statuses");

router.use("/users", userRouter);
router.use("/orders", ordersRouter);
router.use("/statuses", statusesRouter);

module.exports = router;
