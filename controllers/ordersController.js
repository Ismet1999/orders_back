const ApiError = require("../error/ApiError");
const { Orders, Statuses } = require("./../models/models");

class OrdersController {
  async getAll(req, res, next) {
    try {
      console.log("__dirname ", "./../static/images/");

      await Orders.findAll({
        include: [
          {
            model: Statuses,
            attributes: ["id", "title", "color"],
            as: "status",
          },
        ],
      }).then((orders) => res.json(orders));
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  }
  async create(req, res, next) {
    try {
      console.log("req.file", JSON.stringify(req.file));
      let order = {
        photo: req.file.path,
        ...req.body,
      };
      await Orders.create(order).then((order) => res.json(order));
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  }
  async getOne(req, res, next) {
    try {
      let order = await Orders.findOne({ where: { id: req.params.id } });
      res.json(order);
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  }
  async edit(req, res, next) {
    try {
      let order = await Orders.update(req.body, {
        where: { id: req.params.id },
      });
      res.json(order);
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  }
  async delete(req, res, next) {
    try {
      await Orders.findOne({ where: { id: req.params.id } })
        .then((order) => order.destroy())
        .then(() => res.json({ message: "order deleted" }));
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  }
}

module.exports = new OrdersController();
