const ApiError = require("../error/ApiError");
const { Statuses } = require("./../models/models");

class StatusesController {
  async getAll(req, res, next) {
    try {
      await Statuses.findAll().then((statuses) => res.json(statuses));
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  }
  async create(req, res, next) {
    try {
      await Statuses.create(req.body).then((status) => res.json(status));
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  }
  async getOne(req, res, next) {
    try {
      let status = await Statuses.findOne({ where: { id: req.params.id } });
      res.json(status);
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  }
  async edit(req, res, next) {
    try {
      let status = await Statuses.update(req.body, {
        where: { id: req.params.id },
      });
      res.json(status);
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  }
  async delete(req, res, next) {
    try {
      await Statuses.findOne({ where: { id: req.params.id } })
        .then((status) => status.destroy())
        .then(() => res.json({ message: "status deleted" }));
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  }
}

module.exports = new StatusesController();
