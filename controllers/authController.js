const ApiError = require("../error/ApiError");
const { Users } = require("./../models/models");
const jwt = require("jsonwebtoken");

function generateAccessToken(username) {
  let accesstoken = jwt.sign(username, process.env.TOKEN_SECRET, {
    expiresIn: "1800s",
  });
  let refreshToken = jwt.sign(username, process.env.TOKEN_SECRET, {
    expiresIn: "3600s",
  });
  return {
    accesstoken,
    refreshToken,
  };
}

class AuthController {
  async login(req, res, next) {
    try {
      await Users.findOne({
        where: { name: req.body.name, password: req.body.password },
      }).then(async (user) => {
        let tokens = generateAccessToken({ name: user.name });
        res.json(tokens);
      });
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  }
  async refresh(req, res, next) {
    try {
      if (req.user.exp - req.user.iat < 3600) return res.sendStatus(403);
      let tokens = generateAccessToken({ name: req.user.name });
      res.json(tokens);
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  }
}

module.exports = new AuthController();
