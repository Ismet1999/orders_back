const ApiError = require("../error/ApiError");
const { Orders, Statuses } = require("./../models/models");

class OrdersController {
  async getAll(req, res, next) {
    try {
      await Orders.findAll({
        include: [
          {
            model: Statuses,
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
      let order = {
        photo: req.file.path,
        ...req.body,
      };
      await Orders.create(order).then((ord) => res.json(ord));
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
      let order = {
        ...req.body,
      };
      if (req.file.path) {
        order.photo = req.file.path;
      }
      let ord = await Orders.update(order, {
        where: { id: req.params.id },
      });
      res.json(ord);
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
