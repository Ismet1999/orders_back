const ApiError = require("../error/apiError");
const { Users } = require("./../models/models");
class UserController {
  async getAll(req, res, next) {
    try {
      await Users.findAll().then((users) => res.json(users));
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  }
  async create(req, res, next) {
    try {
      await Users.create(req.body).then((user) => res.json(user));
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  }
  async getOne(req, res, next) {
    try {
      let user = await Users.findOne({ where: { id: req.params.id } });
      res.json(user);
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  }
  async edit(req, res, next) {
    try {
      let user = await Users.update(req.body, { where: { id: req.params.id } });
      res.json(user);
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  }
  async delete(req, res, next) {
    try {
      await Users.findOne({ where: { id: req.params.id } })
        .then((user) => user.destroy())
        .then(() => res.json({ message: "User deleted" }));
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  }
}

module.exports = new UserController();
