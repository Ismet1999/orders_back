const ApiError = require("../error/ApiError");
const { Users } = require("./../models/models");
class UserController {
  async get(req, res, next) {
    try {
      console.log("req.params", req.originalUrl);
      console.log("req.__appDir", "./");

      await res.download("./" + req.originalUrl);
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  }
}

module.exports = new UserController();
