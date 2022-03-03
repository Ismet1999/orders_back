const ApiError = require("../error/ApiError");
const { Orders, Statuses } = require("./../models/models");
const { Op } = require("sequelize");

class OrdersController {
  async getAll(req, res, next) {
    try {
      let { search } = req.query;
      let orders;
      let include = [
        {
          model: Statuses,
          as: "status",
        },
      ];
      if (search) {
        orders = await Orders.findAll({
          where: {
            phone: {
              [Op.like]: `%${search}%`,
            },
          },
          include,
        });
      } else {
        orders = await Orders.findAll({ include });
      }
      res.json(orders);
    } catch (err) {
      next(err);
    }
  }
  async create(req, res, next) {
    try {
      let order = {
        ...req.body,
      };
      if (req.file && req.file.path) {
        order.photo = req.file.path;
      }
      await Orders.create(order).then((ord) => res.json(ord));
    } catch (err) {
      next(err);
    }
  }
  async getOne(req, res, next) {
    try {
      let order = await Orders.findOne({ where: { id: req.params.id } });
      res.json(order);
    } catch (err) {
      next(err);
    }
  }
  async edit(req, res, next) {
    try {
      let order = {
        ...req.body,
      };
      if (req.file && req.file.path) {
        order.photo = req.file.path;
      } 
      let ord = await Orders.update(order, {
        where: { id: req.params.id },
      });
      res.json(ord);
    } catch (err) {
      next(err);
    }
  }
  async delete(req, res, next) {
    try {
      await Orders.findOne({ where: { id: req.params.id } })
        .then((order) => order.destroy())
        .then(() => res.json({ message: "order deleted" }));
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new OrdersController();
